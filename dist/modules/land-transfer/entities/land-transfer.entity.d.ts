import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum TransferStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare class LandTransfer extends BaseEntity {
    land: Land;
    fromOwner: User;
    toOwner: User;
    status: TransferStatus;
    transferAmount: number;
    documents: object;
    reason: string;
    approvedBy: User;
    approvalDate: Date;
    rejectionReason: string;
}
