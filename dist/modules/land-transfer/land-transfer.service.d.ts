import { Repository } from 'typeorm';
import { LandTransfer, TransferStatus } from './entities/land-transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class LandTransferService {
    private readonly transferRepository;
    private readonly landService;
    private readonly notificationsService;
    private readonly usersService;
    constructor(transferRepository: Repository<LandTransfer>, landService: LandRegistrationService, notificationsService: NotificationsService, usersService: UsersService);
    create(createTransferDto: CreateTransferDto): Promise<LandTransfer>;
    findAll(): Promise<LandTransfer[]>;
    findOne(id: string): Promise<LandTransfer>;
    update(id: string, updateTransferDto: UpdateTransferDto): Promise<LandTransfer>;
    remove(id: string): Promise<void>;
    approve(id: string): Promise<LandTransfer>;
    reject(id: string, reason: string): Promise<LandTransfer>;
    findByStatus(status: TransferStatus): Promise<LandTransfer[]>;
    findByOwner(ownerId: string): Promise<LandTransfer[]>;
}
