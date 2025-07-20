import { DisputeType } from '../entities/land-dispute.entity';
export declare class CreateDisputeDto {
    landId: string;
    respondentIds: string[];
    type: DisputeType;
    description: string;
    evidence?: object;
    witnesses?: string[];
    requiresFieldVisit?: boolean;
}
