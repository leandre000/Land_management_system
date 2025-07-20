import { UrbanizationService } from './urbanization.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
export declare class UrbanizationController {
    private readonly urbanizationService;
    constructor(urbanizationService: UrbanizationService);
    create(createPermitDto: CreatePermitDto): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    findAll(): Promise<import("./entities/construction-permit.entity").ConstructionPermit[]>;
    getPendingPermits(): Promise<import("./entities/construction-permit.entity").ConstructionPermit[]>;
    getApprovedPermits(): Promise<import("./entities/construction-permit.entity").ConstructionPermit[]>;
    findByApplicant(req: any): Promise<import("./entities/construction-permit.entity").ConstructionPermit[]>;
    findOne(id: string): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    update(id: string, updatePermitDto: UpdatePermitDto): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    remove(id: string): Promise<void>;
    approve(id: string): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    reject(id: string, reason: string): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    recordInspection(id: string, report: string): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
    updateFeeStatus(id: string, paid: boolean): Promise<import("./entities/construction-permit.entity").ConstructionPermit>;
}
