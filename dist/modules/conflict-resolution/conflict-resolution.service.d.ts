import { Repository } from 'typeorm';
import { LandDispute, DisputeStatus } from './entities/land-dispute.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class ConflictResolutionService {
    private readonly disputeRepository;
    private readonly landService;
    private readonly notificationsService;
    private readonly usersService;
    constructor(disputeRepository: Repository<LandDispute>, landService: LandRegistrationService, notificationsService: NotificationsService, usersService: UsersService);
    create(createDisputeDto: CreateDisputeDto): Promise<LandDispute>;
    findAll(): Promise<LandDispute[]>;
    findOne(id: string): Promise<LandDispute>;
    update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<LandDispute>;
    remove(id: string): Promise<void>;
    resolve(id: string, resolution: string): Promise<LandDispute>;
    findByStatus(status: DisputeStatus): Promise<LandDispute[]>;
    findByParticipant(userId: string): Promise<LandDispute[]>;
    addComment(id: string, comment: string): Promise<LandDispute>;
    recordFieldVisit(id: string, report: string): Promise<LandDispute>;
}
