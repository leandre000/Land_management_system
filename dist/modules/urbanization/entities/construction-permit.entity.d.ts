import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum PermitStatus {
    PENDING = "pending",
    IN_REVIEW = "in_review",
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
export declare class ConstructionPermit extends BaseEntity {
    land: Land;
    applicant: User;
    constructionType: ConstructionType;
    projectDescription: string;
    estimatedCost: number;
    totalArea: number;
    floors: number;
    status: PermitStatus;
    architecturalPlans: object;
    structuralPlans: object;
    proposedStartDate: Date;
    proposedEndDate: Date;
    approvalDate: Date;
    expiryDate: Date;
    reviewedBy: User;
    reviewComments: string;
    conditions: string[];
    requiresInspection: boolean;
    inspectionDate: Date;
    inspectionReport: string;
    permitFee: number;
    feesPaid: boolean;
}
