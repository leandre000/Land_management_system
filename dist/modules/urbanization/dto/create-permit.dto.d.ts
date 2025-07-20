import { ConstructionType } from '../entities/construction-permit.entity';
import { User } from '../../users/entities/user.entity';
export declare class CreatePermitDto {
    landId: string;
    applicantId: string;
    constructionType: ConstructionType;
    projectDescription: string;
    estimatedCost: number;
    documents?: string[];
    applicant?: User;
}
