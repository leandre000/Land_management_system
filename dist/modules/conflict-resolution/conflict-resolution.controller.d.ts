import { ConflictResolutionService } from './conflict-resolution.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
export declare class ConflictResolutionController {
    private readonly conflictResolutionService;
    constructor(conflictResolutionService: ConflictResolutionService);
    create(createDisputeDto: CreateDisputeDto): Promise<import("./entities/land-dispute.entity").LandDispute>;
    findAll(): Promise<import("./entities/land-dispute.entity").LandDispute[]>;
    getActiveDisputes(): Promise<import("./entities/land-dispute.entity").LandDispute[]>;
    getResolvedDisputes(): Promise<import("./entities/land-dispute.entity").LandDispute[]>;
    findByParticipant(req: any): Promise<import("./entities/land-dispute.entity").LandDispute[]>;
    findOne(id: string): Promise<import("./entities/land-dispute.entity").LandDispute>;
    update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<import("./entities/land-dispute.entity").LandDispute>;
    remove(id: string): Promise<void>;
    resolve(id: string, resolution: string): Promise<import("./entities/land-dispute.entity").LandDispute>;
    addComment(id: string, comment: string): Promise<import("./entities/land-dispute.entity").LandDispute>;
    recordFieldVisit(id: string, report: string): Promise<import("./entities/land-dispute.entity").LandDispute>;
}
