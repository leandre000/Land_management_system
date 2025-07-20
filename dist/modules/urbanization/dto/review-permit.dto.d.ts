export declare class ReviewPermitDto {
    approved: boolean;
    reviewComments: string;
    conditions?: string[];
    requiresInspection?: boolean;
    permitFee?: number;
    expiryDate?: Date;
}
