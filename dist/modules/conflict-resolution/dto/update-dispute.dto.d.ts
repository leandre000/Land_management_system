import { DisputeStatus } from '../entities/land-dispute.entity';
export declare class UpdateDisputeDto {
    status?: DisputeStatus;
    mediatorId?: string;
    mediationDate?: Date;
    resolution?: string;
    comments?: string[];
    fieldVisitDate?: Date;
    fieldVisitReport?: string;
    evidence?: object;
}
