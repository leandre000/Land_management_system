import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum PermitStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    EXPIRED = "expired"
}
export declare enum ConstructionType {
    RESIDENTIAL = "residential",
    COMMERCIAL = "commercial",
    INDUSTRIAL = "industrial",
    MIXED_USE = "mixed_use",
    OTHER = "other"
}
export declare class ConstructionPermit {
    id: string;
    land: Land;
    applicant: User;
    constructionType: ConstructionType;
    projectDescription: string;
    estimatedCost: number;
    documents: string[];
    status: PermitStatus;
    approvalDate: Date;
    rejectedAt: Date;
    rejectionReason: string;
    permitFee: number;
    feesPaid: boolean;
    requiresInspection: boolean;
    inspectionDate: Date;
    inspectionReport: string;
    conditions: string[];
    expiryDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
