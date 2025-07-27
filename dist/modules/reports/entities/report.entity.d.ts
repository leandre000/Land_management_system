export declare enum ReportType {
    WEEKLY_SUMMARY = "WEEKLY_SUMMARY",
    MONTHLY_SUMMARY = "MONTHLY_SUMMARY",
    GEO_ANALYTICS = "GEO_ANALYTICS",
    TAX_SUMMARY = "TAX_SUMMARY"
}
export declare enum ReportStatus {
    GENERATING = "GENERATING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare class Report {
    id: string;
    type: ReportType;
    status: ReportStatus;
    title: string;
    description?: string;
    data?: object;
    filePath?: string;
    fileSize?: number;
    reportPeriodStart: Date;
    reportPeriodEnd: Date;
    createdAt: Date;
}
