import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum DisputeStatus {
    PENDING = "pending",
    IN_MEDIATION = "in_mediation",
    RESOLVED = "resolved",
    CANCELLED = "cancelled"
}
export declare enum DisputeType {
    BOUNDARY = "boundary",
    OWNERSHIP = "ownership",
    INHERITANCE = "inheritance",
    ENCROACHMENT = "encroachment",
    OTHER = "other"
}
export declare class LandDispute {
    id: string;
    land: Land;
    complainant: User;
    mediator: User;
    respondents: User[];
    type: DisputeType;
    description: string;
    evidence: string[];
    status: DisputeStatus;
    resolution: string;
    resolvedAt: Date;
    comments: string[];
    requiresFieldVisit: boolean;
    fieldVisitDate: Date;
    fieldVisitReport: string;
    createdAt: Date;
    updatedAt: Date;
}
