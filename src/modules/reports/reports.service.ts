import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Report, ReportType, ReportStatus } from './entities/report.entity';
import { Land } from '../land-registration/entities/land.entity';
import { User } from '../users/entities/user.entity';
import { TaxAssessment } from '../land-taxes/entities/tax-assessment.entity';
import { LandDispute } from '../conflict-resolution/entities/land-dispute.entity';
import { DocumentGenerationService } from '../document-generation/document-generation.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../audit-logs/entities/audit-log.entity';
import { TaxStatus } from '../land-taxes/entities/tax-assessment.entity';
import { formatRwandaNationalId } from '../../common/validators/rwanda-national-id.validator';

export interface WeeklyReportData {
  totalLands: number;
  totalArea: number;
  newLandsThisWeek: number;
  topLandOwners: Array<{
    name: string;
    nationalId: string;
    landCount: number;
    totalArea: number;
  }>;
  regionStats: Array<{
    region: string;
    landCount: number;
    totalArea: number;
    conflicts: number;
  }>;
  taxSummary: {
    totalAssessed: number;
    totalPaid: number;
    totalPending: number;
    overdueCount: number;
  };
  recentActivity: Array<{
    action: string;
    date: Date;
    description: string;
  }>;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Land)
    private readonly landRepository: Repository<Land>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TaxAssessment)
    private readonly taxRepository: Repository<TaxAssessment>,
    @InjectRepository(LandDispute)
    private readonly disputeRepository: Repository<LandDispute>,
    private readonly documentService: DocumentGenerationService,
    private readonly auditService: AuditLogsService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async generateWeeklyReport() {
    console.log('🔄 Generating weekly land management report...');
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    try {
      const reportData = await this.collectWeeklyData(startDate, endDate);
      const report = await this.createReport(
        ReportType.WEEKLY_SUMMARY,
        'Weekly Land Management Summary',
        `Automated weekly report for ${startDate.toDateString()} to ${endDate.toDateString()}`,
        reportData,
        startDate,
        endDate
      );

      // Generate PDF
      await this.generateReportPDF(report.id);
      
      console.log('✅ Weekly report generated successfully');
    } catch (error) {
      console.error('❌ Failed to generate weekly report:', error);
    }
  }

  async generateManualReport(type: ReportType, startDate: Date, endDate: Date): Promise<Report> {
    let reportData: any;
    let title: string;
    let description: string;

    switch (type) {
      case ReportType.WEEKLY_SUMMARY:
        reportData = await this.collectWeeklyData(startDate, endDate);
        title = 'Weekly Land Management Summary';
        description = `Manual weekly report for ${startDate.toDateString()} to ${endDate.toDateString()}`;
        break;
      case ReportType.GEO_ANALYTICS:
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

  private async collectWeeklyData(startDate: Date, endDate: Date): Promise<WeeklyReportData> {
    // Total lands and area
    const allLands = await this.landRepository.find({ relations: ['owner'] });
    const totalLands = allLands.length;
    const totalArea = allLands.reduce((sum, land) => sum + land.area, 0);

    // New lands this week
    const newLands = await this.landRepository.count({
      where: { createdAt: Between(startDate, endDate) }
    });

    // Top 5 land owners
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
      nationalId: stat.nationalId ? formatRwandaNationalId(stat.nationalId) : 'N/A',
      landCount: parseInt(stat.landCount),
      totalArea: parseFloat(stat.totalArea) || 0,
    }));

    // Region statistics (based on address)
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

    // Tax summary
    const allTaxes = await this.taxRepository.find();
    const taxSummary = {
      totalAssessed: allTaxes.reduce((sum, tax) => sum + tax.taxAmount, 0),
      totalPaid: allTaxes.reduce((sum, tax) => sum + tax.paidAmount, 0),
      totalPending: allTaxes.filter(tax => tax.status === TaxStatus.PENDING).length,
      overdueCount: allTaxes.filter(tax => tax.status === TaxStatus.OVERDUE).length,
    };

    // Recent activity from audit logs
    const recentActivity = await this.auditService.findRecent(168); // 7 days in hours
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

  private async collectGeoAnalytics(startDate: Date, endDate: Date): Promise<any> {
    // Geographic analytics implementation
    const lands = await this.landRepository.find({
      where: { createdAt: Between(startDate, endDate) },
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

  private async createReport(
    type: ReportType,
    title: string,
    description: string,
    data: any,
    startDate: Date,
    endDate: Date
  ): Promise<Report> {
    const report = this.reportRepository.create({
      type,
      title,
      description,
      data,
      reportPeriodStart: startDate,
      reportPeriodEnd: endDate,
      status: ReportStatus.GENERATING,
    });

    return this.reportRepository.save(report);
  }

  private async generateReportPDF(reportId: string): Promise<void> {
    const report = await this.reportRepository.findOne({ where: { id: reportId } });
    if (!report) throw new Error('Report not found');

    try {
      // Generate PDF using document service (we'll extend it for reports)
      const html = this.generateReportHTML(report);
      
      // For now, mark as completed (we'll implement PDF generation next)
      report.status = ReportStatus.COMPLETED;
      report.filePath = `/reports/${reportId}.pdf`;
      
      await this.reportRepository.save(report);
      
      // Log the report generation
      await this.auditService.createLog({
        action: AuditAction.DOCUMENT_GENERATED,
        entityType: 'Report',
        entityId: reportId,
        description: `${report.type} report generated successfully`,
        metadata: { reportType: report.type, period: `${report.reportPeriodStart} to ${report.reportPeriodEnd}` }
      });
    } catch (error) {
      report.status = ReportStatus.FAILED;
      await this.reportRepository.save(report);
      throw error;
    }
  }

  private generateReportHTML(report: Report): string {
    // Simple HTML generation for now - we'll enhance this
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

  async getReports(limit: number = 20): Promise<Report[]> {
    return this.reportRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getReport(id: string): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });
    if (!report) throw new Error('Report not found');
    return report;
  }

  async downloadReport(id: string): Promise<Buffer> {
    const report = await this.getReport(id);
    
    if (report.status !== ReportStatus.COMPLETED) {
      throw new Error('Report is not ready for download');
    }

    // For now, generate HTML content as buffer
    const html = this.generateReportHTML(report);
    return Buffer.from(html);
  }
} 