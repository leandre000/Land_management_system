"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const report_entity_1 = require("./entities/report.entity");
const land_entity_1 = require("../land-registration/entities/land.entity");
const user_entity_1 = require("../users/entities/user.entity");
const tax_assessment_entity_1 = require("../land-taxes/entities/tax-assessment.entity");
const land_dispute_entity_1 = require("../conflict-resolution/entities/land-dispute.entity");
const document_generation_service_1 = require("../document-generation/document-generation.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const audit_log_entity_1 = require("../audit-logs/entities/audit-log.entity");
const tax_assessment_entity_2 = require("../land-taxes/entities/tax-assessment.entity");
const rwanda_national_id_validator_1 = require("../../common/validators/rwanda-national-id.validator");
let ReportsService = class ReportsService {
    reportRepository;
    landRepository;
    userRepository;
    taxRepository;
    disputeRepository;
    documentService;
    auditService;
    constructor(reportRepository, landRepository, userRepository, taxRepository, disputeRepository, documentService, auditService) {
        this.reportRepository = reportRepository;
        this.landRepository = landRepository;
        this.userRepository = userRepository;
        this.taxRepository = taxRepository;
        this.disputeRepository = disputeRepository;
        this.documentService = documentService;
        this.auditService = auditService;
    }
    async generateWeeklyReport() {
        console.log('🔄 Generating weekly land management report...');
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        try {
            const reportData = await this.collectWeeklyData(startDate, endDate);
            const report = await this.createReport(report_entity_1.ReportType.WEEKLY_SUMMARY, 'Weekly Land Management Summary', `Automated weekly report for ${startDate.toDateString()} to ${endDate.toDateString()}`, reportData, startDate, endDate);
            await this.generateReportPDF(report.id);
            console.log('✅ Weekly report generated successfully');
        }
        catch (error) {
            console.error('❌ Failed to generate weekly report:', error);
        }
    }
    async generateManualReport(type, startDate, endDate) {
        let reportData;
        let title;
        let description;
        switch (type) {
            case report_entity_1.ReportType.WEEKLY_SUMMARY:
                reportData = await this.collectWeeklyData(startDate, endDate);
                title = 'Weekly Land Management Summary';
                description = `Manual weekly report for ${startDate.toDateString()} to ${endDate.toDateString()}`;
                break;
            case report_entity_1.ReportType.GEO_ANALYTICS:
                reportData = await this.collectGeoAnalytics(startDate, endDate);
                title = 'Geographic Analytics Report';
                description = `Geographic analysis for ${startDate.toDateString()} to ${endDate.toDateString()}`;
                break;
            default:
                throw new Error(`Unsupported report type: ${type}`);
        }
        const report = await this.createReport(type, title, description, reportData, startDate, endDate);
        await this.generateReportPDF(report.id);
        return report;
    }
    async collectWeeklyData(startDate, endDate) {
        const allLands = await this.landRepository.find({ relations: ['owner'] });
        const totalLands = allLands.length;
        const totalArea = allLands.reduce((sum, land) => sum + land.area, 0);
        const newLands = await this.landRepository.count({
            where: { createdAt: (0, typeorm_2.Between)(startDate, endDate) }
        });
        const ownerStats = await this.landRepository
            .createQueryBuilder('land')
            .leftJoin('land.owner', 'owner')
            .select([
            'owner.firstName as firstName',
            'owner.lastName as lastName',
            'owner.nationalId as nationalId',
            'COUNT(land.id) as landCount',
            'SUM(land.area) as totalArea'
        ])
            .groupBy('owner.id, owner.firstName, owner.lastName, owner.nationalId')
            .orderBy('landCount', 'DESC')
            .limit(5)
            .getRawMany();
        const topLandOwners = ownerStats.map(stat => ({
            name: `${stat.firstName} ${stat.lastName}`,
            nationalId: stat.nationalId ? (0, rwanda_national_id_validator_1.formatRwandaNationalId)(stat.nationalId) : 'N/A',
            landCount: parseInt(stat.landCount),
            totalArea: parseFloat(stat.totalArea) || 0,
        }));
        const regionStats = await this.landRepository
            .createQueryBuilder('land')
            .leftJoin('land_disputes', 'dispute', 'dispute.landId = land.id')
            .select([
            'COALESCE(SPLIT_PART(land.address, \',\', -1), \'Unknown\') as region',
            'COUNT(land.id) as landCount',
            'SUM(land.area) as totalArea',
            'COUNT(dispute.id) as conflicts'
        ])
            .groupBy('region')
            .orderBy('landCount', 'DESC')
            .getRawMany();
        const allTaxes = await this.taxRepository.find();
        const taxSummary = {
            totalAssessed: allTaxes.reduce((sum, tax) => sum + tax.taxAmount, 0),
            totalPaid: allTaxes.reduce((sum, tax) => sum + tax.paidAmount, 0),
            totalPending: allTaxes.filter(tax => tax.status === tax_assessment_entity_2.TaxStatus.PENDING).length,
            overdueCount: allTaxes.filter(tax => tax.status === tax_assessment_entity_2.TaxStatus.OVERDUE).length,
        };
        const recentActivity = await this.auditService.findRecent(168);
        const formattedActivity = recentActivity.slice(0, 10).map(log => ({
            action: log.action,
            date: log.createdAt,
            description: log.description || `${log.action} on ${log.entityType}`,
        }));
        return {
            totalLands,
            totalArea: Math.round(totalArea),
            newLandsThisWeek: newLands,
            topLandOwners,
            regionStats: regionStats.map(stat => ({
                region: stat.region.trim(),
                landCount: parseInt(stat.landCount),
                totalArea: Math.round(parseFloat(stat.totalArea) || 0),
                conflicts: parseInt(stat.conflicts) || 0,
            })),
            taxSummary,
            recentActivity: formattedActivity,
        };
    }
    async collectGeoAnalytics(startDate, endDate) {
        const lands = await this.landRepository.find({
            where: { createdAt: (0, typeorm_2.Between)(startDate, endDate) },
            relations: ['owner']
        });
        return {
            landsByRegion: {},
            averageParcelSize: lands.reduce((sum, land) => sum + land.area, 0) / lands.length,
            largestParcel: Math.max(...lands.map(land => land.area)),
            smallestParcel: Math.min(...lands.map(land => land.area)),
            totalLandsAnalyzed: lands.length,
        };
    }
    async createReport(type, title, description, data, startDate, endDate) {
        const report = this.reportRepository.create({
            type,
            title,
            description,
            data,
            reportPeriodStart: startDate,
            reportPeriodEnd: endDate,
            status: report_entity_1.ReportStatus.GENERATING,
        });
        return this.reportRepository.save(report);
    }
    async generateReportPDF(reportId) {
        const report = await this.reportRepository.findOne({ where: { id: reportId } });
        if (!report)
            throw new Error('Report not found');
        try {
            const html = this.generateReportHTML(report);
            report.status = report_entity_1.ReportStatus.COMPLETED;
            report.filePath = `/reports/${reportId}.pdf`;
            await this.reportRepository.save(report);
            await this.auditService.createLog({
                action: audit_log_entity_1.AuditAction.DOCUMENT_GENERATED,
                entityType: 'Report',
                entityId: reportId,
                description: `${report.type} report generated successfully`,
                metadata: { reportType: report.type, period: `${report.reportPeriodStart} to ${report.reportPeriodEnd}` }
            });
        }
        catch (error) {
            report.status = report_entity_1.ReportStatus.FAILED;
            await this.reportRepository.save(report);
            throw error;
        }
    }
    generateReportHTML(report) {
        return `
      <html>
        <body>
          <h1>${report.title}</h1>
          <p>${report.description}</p>
          <pre>${JSON.stringify(report.data, null, 2)}</pre>
        </body>
      </html>
    `;
    }
    async getReports(limit = 20) {
        return this.reportRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getReport(id) {
        const report = await this.reportRepository.findOne({ where: { id } });
        if (!report)
            throw new Error('Report not found');
        return report;
    }
    async downloadReport(id) {
        const report = await this.getReport(id);
        if (report.status !== report_entity_1.ReportStatus.COMPLETED) {
            throw new Error('Report is not ready for download');
        }
        const html = this.generateReportHTML(report);
        return Buffer.from(html);
    }
};
exports.ReportsService = ReportsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsService.prototype, "generateWeeklyReport", null);
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(1, (0, typeorm_1.InjectRepository)(land_entity_1.Land)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(tax_assessment_entity_1.TaxAssessment)),
    __param(4, (0, typeorm_1.InjectRepository)(land_dispute_entity_1.LandDispute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        document_generation_service_1.DocumentGenerationService,
        audit_logs_service_1.AuditLogsService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map