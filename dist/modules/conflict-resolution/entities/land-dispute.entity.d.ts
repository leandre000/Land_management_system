import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum DisputeStatus {
    PENDING = "pending",
    IN_MEDIATION = "in_mediation",
    RESOLVED = "resolved",
    ESCALATED = "escalated",
    CLOSED = "closed"
}
export declare enum DisputeType {
    BOUNDARY = "boundary",
    OWNERSHIP = "ownership",
    INHERITANCE = "inheritance",
    ENCROACHMENT = "encroachment",
    OTHER = "other"
}
export declare class LandDispute extends BaseEntity {
    land: Land;
    complainant: User;
    respondents: User[];
    type: DisputeType;
    description: string;
    status: DisputeStatus;
    evidence: object;
    witnesses: string[];
    mediator: User;
    mediationDate: Date;
    resolution: string;
    resolutionDate: Date;
    comments: string[];
    requiresFieldVisit: boolean;
    fieldVisitDate: Date;
    fieldVisitReport: string;
}
