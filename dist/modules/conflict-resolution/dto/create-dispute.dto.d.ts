import { DisputeType } from '../entities/land-dispute.entity';
import { User } from '../../users/entities/user.entity';
export declare class CreateDisputeDto {
    landId: string;
    complainantId: string;
    respondentIds: string[];
    type: DisputeType;
    description: string;
    evidence?: string[];
    requiresFieldVisit?: boolean;
    complainant?: User;
    respondents?: User[];
}
