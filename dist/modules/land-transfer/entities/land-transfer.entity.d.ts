import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum TransferStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class LandTransfer {
    id: string;
    land: Land;
    fromOwner: User;
    toOwner: User;
    status: TransferStatus;
    transferAmount: number;
    documents: string[];
    reason: string;
    rejectionReason: string;
    approvalDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
