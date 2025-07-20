import { UrbanizationService } from './urbanization.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { ReviewPermitDto } from './dto/review-permit.dto';
import { ConstructionPermit } from './entities/construction-permit.entity';
export declare class UrbanizationController {
    private readonly urbanizationService;
    constructor(urbanizationService: UrbanizationService);
    create(createPermitDto: CreatePermitDto, req: any): Promise<ConstructionPermit>;
    findAll(): Promise<ConstructionPermit[]>;
    getPendingPermits(): Promise<ConstructionPermit[]>;
    getApprovedPermits(): Promise<ConstructionPermit[]>;
    findMyPermits(req: any): Promise<ConstructionPermit[]>;
    findOne(id: string): Promise<ConstructionPermit>;
    review(id: string, reviewPermitDto: ReviewPermitDto, req: any): Promise<ConstructionPermit>;
    recordPayment(id: string): Promise<ConstructionPermit>;
    scheduleInspection(id: string, date: Date): Promise<ConstructionPermit>;
    submitInspectionReport(id: string, report: string): Promise<ConstructionPermit>;
}
