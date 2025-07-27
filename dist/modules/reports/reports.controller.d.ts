import { Response } from 'express';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getReports(limit?: string): Promise<import("./entities/report.entity").Report[]>;
    generateWeeklyReport(startDate?: string, endDate?: string): Promise<{
        message: string;
        reportId: string;
        downloadUrl: string;
    }>;
    generateAnalyticsReport(startDate?: string, endDate?: string): Promise<{
        message: string;
        reportId: string;
        downloadUrl: string;
    }>;
    getReport(id: string): Promise<import("./entities/report.entity").Report>;
    downloadReport(id: string, res: Response): Promise<void>;
    getDashboardStats(): Promise<{
        message: string;
        data: object | undefined;
        generatedAt: Date;
    }>;
}
