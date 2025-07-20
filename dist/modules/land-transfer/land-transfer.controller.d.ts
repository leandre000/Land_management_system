import { LandTransferService } from './land-transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApproveTransferDto } from './dto/approve-transfer.dto';
import { LandTransfer } from './entities/land-transfer.entity';
export declare class LandTransferController {
    private readonly landTransferService;
    constructor(landTransferService: LandTransferService);
    create(createTransferDto: CreateTransferDto, req: any): Promise<LandTransfer>;
    findAll(): Promise<LandTransfer[]>;
    findMyTransfers(req: any): Promise<LandTransfer[]>;
    findOne(id: string): Promise<LandTransfer>;
    approve(id: string, approveTransferDto: ApproveTransferDto, req: any): Promise<LandTransfer>;
    cancel(id: string, req: any): Promise<LandTransfer>;
}
