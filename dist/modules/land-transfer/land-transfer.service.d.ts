import { Repository } from 'typeorm';
import { LandTransfer } from './entities/land-transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApproveTransferDto } from './dto/approve-transfer.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { UsersService } from '../users/users.service';
export declare class LandTransferService {
    private readonly transferRepository;
    private readonly landService;
    private readonly usersService;
    constructor(transferRepository: Repository<LandTransfer>, landService: LandRegistrationService, usersService: UsersService);
    create(createTransferDto: CreateTransferDto, fromOwner: User): Promise<LandTransfer>;
    findAll(): Promise<LandTransfer[]>;
    findOne(id: string): Promise<LandTransfer>;
    findByUser(userId: string): Promise<LandTransfer[]>;
    approve(id: string, approveTransferDto: ApproveTransferDto, officer: User): Promise<LandTransfer>;
    cancel(id: string, user: User): Promise<LandTransfer>;
}
