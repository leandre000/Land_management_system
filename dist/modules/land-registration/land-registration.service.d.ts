import { Repository } from 'typeorm';
import { Land, LandStatus } from './entities/land.entity';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { UsersService } from '../users/users.service';
export declare class LandRegistrationService {
    private readonly landRepository;
    private readonly rabbitMQService;
    private readonly usersService;
    constructor(landRepository: Repository<Land>, rabbitMQService: RabbitMQService, usersService: UsersService);
    create(createLandDto: CreateLandDto): Promise<Land>;
    findAll(): Promise<Land[]>;
    findOne(id: string): Promise<Land>;
    update(id: string, updateLandDto: UpdateLandDto): Promise<Land>;
    remove(id: string): Promise<void>;
    verify(id: string, verifiedBy: string): Promise<Land>;
    findByOwner(ownerId: string): Promise<Land[]>;
    findByStatus(status: LandStatus): Promise<Land[]>;
    findNearby(latitude: number, longitude: number, radiusMeters?: number): Promise<Land[]>;
}
