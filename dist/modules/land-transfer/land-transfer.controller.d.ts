import { LandTransferService } from './land-transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
export declare class LandTransferController {
    private readonly landTransferService;
    constructor(landTransferService: LandTransferService);
    create(createTransferDto: CreateTransferDto): Promise<import("./entities/land-transfer.entity").LandTransfer>;
    findAll(): Promise<import("./entities/land-transfer.entity").LandTransfer[]>;
    findMyTransfers(req: any): Promise<import("./entities/land-transfer.entity").LandTransfer[]>;
    findOne(id: string): Promise<import("./entities/land-transfer.entity").LandTransfer>;
    update(id: string, updateTransferDto: UpdateTransferDto): Promise<import("./entities/land-transfer.entity").LandTransfer>;
    remove(id: string): Promise<void>;
    approve(id: string): Promise<import("./entities/land-transfer.entity").LandTransfer>;
    reject(id: string, reason: string): Promise<import("./entities/land-transfer.entity").LandTransfer>;
}
