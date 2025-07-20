import { Repository } from 'typeorm';
import { ConstructionPermit, PermitStatus } from './entities/construction-permit.entity';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class UrbanizationService {
    private readonly permitRepository;
    private readonly landService;
    private readonly notificationsService;
    private readonly usersService;
    constructor(permitRepository: Repository<ConstructionPermit>, landService: LandRegistrationService, notificationsService: NotificationsService, usersService: UsersService);
    create(createPermitDto: CreatePermitDto): Promise<ConstructionPermit>;
    findAll(): Promise<ConstructionPermit[]>;
    findOne(id: string): Promise<ConstructionPermit>;
    update(id: string, updatePermitDto: UpdatePermitDto): Promise<ConstructionPermit>;
    remove(id: string): Promise<void>;
    approve(id: string): Promise<ConstructionPermit>;
    reject(id: string, reason: string): Promise<ConstructionPermit>;
    findByStatus(status: PermitStatus): Promise<ConstructionPermit[]>;
    findByApplicant(applicantId: string): Promise<ConstructionPermit[]>;
    recordInspection(id: string, report: string): Promise<ConstructionPermit>;
    updateFeeStatus(id: string, paid: boolean): Promise<ConstructionPermit>;
}
