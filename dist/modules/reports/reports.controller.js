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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const report_entity_1 = require("./entities/report.entity");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getReports(limit = '20') {
        return this.reportsService.getReports(parseInt(limit));
    }
    async generateWeeklyReport(startDate, endDate) {
        const end = endDate ? new Date(endDate) : new Date();
        const start = startDate ? new Date(startDate) : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
        const report = await this.reportsService.generateManualReport(report_entity_1.ReportType.WEEKLY_SUMMARY, start, end);
        return {
            message: 'Weekly report generated successfully',
            reportId: report.id,
            downloadUrl: `/reports/${report.id}/download`
        };
    }
    async generateAnalyticsReport(startDate, endDate) {
        const end = endDate ? new Date(endDate) : new Date();
        const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
        const report = await this.reportsService.generateManualReport(report_entity_1.ReportType.GEO_ANALYTICS, start, end);
        return {
            message: 'Analytics report generated successfully',
            reportId: report.id,
            downloadUrl: `/reports/${report.id}/download`
        };
    }
    getReport(id) {
        return this.reportsService.getReport(id);
    }
    async downloadReport(id, res) {
        try {
            const reportBuffer = await this.reportsService.downloadReport(id);
            const report = await this.reportsService.getReport(id);
            res.set({
                'Content-Type': 'text/html',
                'Content-Disposition': `attachment; filename="${report.title.replace(/\s+/g, '_')}.html"`,
                'Content-Length': reportBuffer.length,
            });
            res.status(common_1.HttpStatus.OK).send(reportBuffer);
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to download report',
                error: error.message,
            });
        }
    }
    async getDashboardStats() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const report = await this.reportsService.generateManualReport(report_entity_1.ReportType.WEEKLY_SUMMARY, startDate, endDate);
        return {
            message: 'Dashboard statistics',
            data: report.data,
            generatedAt: new Date(),
        };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all generated reports (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all reports.' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getReports", null);
__decorate([
    (0, common_1.Post)('generate/weekly'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate weekly report manually' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Weekly report generated successfully.' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'YYYY-MM-DD format' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'YYYY-MM-DD format' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateWeeklyReport", null);
__decorate([
    (0, common_1.Post)('generate/analytics'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate geo-analytics report' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Analytics report generated successfully.' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "generateAnalyticsReport", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific report details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return report details.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({ summary: 'Download report as PDF/HTML' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Download report file.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "downloadReport", null);
__decorate([
    (0, common_1.Get)('quick/dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quick dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return dashboard stats.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getDashboardStats", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map