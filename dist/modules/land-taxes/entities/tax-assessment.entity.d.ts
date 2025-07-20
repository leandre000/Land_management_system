import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';
export declare enum TaxStatus {
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    DISPUTED = "disputed"
}
export declare class TaxAssessment extends BaseEntity {
    land: Land;
    assessedValue: number;
    taxRate: number;
    taxAmount: number;
    assessmentDate: Date;
    dueDate: Date;
    status: TaxStatus;
    paidAmount: number;
    paymentDate: Date;
    notes: string;
    assessedBy: User;
    paymentDetails: object;
    penaltyAmount: number;
}
