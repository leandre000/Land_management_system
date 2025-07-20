import { LandRegistrationService } from './land-registration.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { VerifyLandDto } from './dto/verify-land.dto';
import { Land } from './entities/land.entity';
export declare class LandRegistrationController {
    private readonly landRegistrationService;
    constructor(landRegistrationService: LandRegistrationService);
    create(createLandDto: CreateLandDto, req: any): Promise<Land>;
    findAll(): Promise<Land[]>;
    findMyLands(req: any): Promise<Land[]>;
    findOne(id: string): Promise<Land>;
    update(id: string, updateLandDto: UpdateLandDto, req: any): Promise<Land>;
    verify(id: string, verifyLandDto: VerifyLandDto, req: any): Promise<Land>;
    remove(id: string, req: any): Promise<void>;
}
