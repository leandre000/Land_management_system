import { ConflictResolutionService } from './conflict-resolution.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { LandDispute } from './entities/land-dispute.entity';
export declare class ConflictResolutionController {
    private readonly conflictResolutionService;
    constructor(conflictResolutionService: ConflictResolutionService);
    create(createDisputeDto: CreateDisputeDto, req: any): Promise<LandDispute>;
    findAll(): Promise<LandDispute[]>;
    getActiveDisputes(): Promise<LandDispute[]>;
    getResolvedDisputes(): Promise<LandDispute[]>;
    findMyDisputes(req: any): Promise<LandDispute[]>;
    findOne(id: string): Promise<LandDispute>;
    update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<LandDispute>;
    addComment(id: string, comment: string): Promise<LandDispute>;
    scheduleFieldVisit(id: string, date: Date): Promise<LandDispute>;
    submitFieldVisitReport(id: string, report: string): Promise<LandDispute>;
}
