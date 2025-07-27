import { Repository } from 'typeorm';
import { Report, ReportType } from './entities/report.entity';
import { Land } from '../land-registration/entities/land.entity';
import { User } from '../users/entities/user.entity';
import { TaxAssessment } from '../land-taxes/entities/tax-assessment.entity';
import { LandDispute } from '../conflict-resolution/entities/land-dispute.entity';
import { DocumentGenerationService } from '../document-generation/document-generation.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
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
export declare class ReportsService {
    private readonly reportRepository;
    private readonly landRepository;
    private readonly userRepository;
    private readonly taxRepository;
    private readonly disputeRepository;
    private readonly documentService;
    private readonly auditService;
    constructor(reportRepository: Repository<Report>, landRepository: Repository<Land>, userRepository: Repository<User>, taxRepository: Repository<TaxAssessment>, disputeRepository: Repository<LandDispute>, documentService: DocumentGenerationService, auditService: AuditLogsService);
    generateWeeklyReport(): Promise<void>;
    generateManualReport(type: ReportType, startDate: Date, endDate: Date): Promise<Report>;
    private collectWeeklyData;
    private collectGeoAnalytics;
    private createReport;
    private generateReportPDF;
    private generateReportHTML;
    getReports(limit?: number): Promise<Report[]>;
    getReport(id: string): Promise<Report>;
    downloadReport(id: string): Promise<Buffer>;
}
