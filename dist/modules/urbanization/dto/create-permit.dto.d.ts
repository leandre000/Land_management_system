import { ConstructionType } from '../entities/construction-permit.entity';
export declare class CreatePermitDto {
    landId: string;
    constructionType: ConstructionType;
    projectDescription: string;
    estimatedCost: number;
    totalArea: number;
    floors: number;
    architecturalPlans: object;
    structuralPlans?: object;
    proposedStartDate: Date;
    proposedEndDate: Date;
}
