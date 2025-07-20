import { Repository } from 'typeorm';
import { ConstructionPermit } from './entities/construction-permit.entity';
import { CreatePermitDto } from './dto/create-permit.dto';
import { ReviewPermitDto } from './dto/review-permit.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
export declare class UrbanizationService {
    private readonly permitRepository;
    private readonly landService;
    constructor(permitRepository: Repository<ConstructionPermit>, landService: LandRegistrationService);
    create(createPermitDto: CreatePermitDto, applicant: User): Promise<ConstructionPermit>;
    findAll(): Promise<ConstructionPermit[]>;
    findOne(id: string): Promise<ConstructionPermit>;
    findByUser(userId: string): Promise<ConstructionPermit[]>;
    review(id: string, reviewPermitDto: ReviewPermitDto, reviewer: User): Promise<ConstructionPermit>;
    recordPayment(id: string): Promise<ConstructionPermit>;
    scheduleInspection(id: string, date: Date): Promise<ConstructionPermit>;
    submitInspectionReport(id: string, report: string): Promise<ConstructionPermit>;
    checkExpiredPermits(): Promise<void>;
    getPendingPermits(): Promise<ConstructionPermit[]>;
    getApprovedPermits(): Promise<ConstructionPermit[]>;
}
