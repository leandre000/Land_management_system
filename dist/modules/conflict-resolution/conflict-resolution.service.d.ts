import { Repository } from 'typeorm';
import { LandDispute } from './entities/land-dispute.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { UsersService } from '../users/users.service';
export declare class ConflictResolutionService {
    private readonly disputeRepository;
    private readonly landService;
    private readonly usersService;
    constructor(disputeRepository: Repository<LandDispute>, landService: LandRegistrationService, usersService: UsersService);
    create(createDisputeDto: CreateDisputeDto, complainant: User): Promise<LandDispute>;
    findAll(): Promise<LandDispute[]>;
    findOne(id: string): Promise<LandDispute>;
    findByUser(userId: string): Promise<LandDispute[]>;
    update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<LandDispute>;
    addComment(id: string, comment: string): Promise<LandDispute>;
    scheduleFieldVisit(id: string, date: Date): Promise<LandDispute>;
    submitFieldVisitReport(id: string, report: string): Promise<LandDispute>;
    getActiveDisputes(): Promise<LandDispute[]>;
    getResolvedDisputes(): Promise<LandDispute[]>;
}
