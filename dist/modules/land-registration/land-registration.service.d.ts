import { Repository } from 'typeorm';
import { Land } from './entities/land.entity';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { VerifyLandDto } from './dto/verify-land.dto';
import { User } from '../users/entities/user.entity';
export declare class LandRegistrationService {
    private readonly landRepository;
    constructor(landRepository: Repository<Land>);
    create(createLandDto: CreateLandDto, owner: User): Promise<Land>;
    findAll(): Promise<Land[]>;
    findOne(id: string): Promise<Land>;
    findByOwner(ownerId: string): Promise<Land[]>;
    update(id: string, updateLandDto: UpdateLandDto, user: User): Promise<Land>;
    verify(id: string, verifyLandDto: VerifyLandDto, verifier: User): Promise<Land>;
    remove(id: string, user: User): Promise<void>;
}
