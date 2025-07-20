import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { LandStatus } from '../../../common/enums/land-status.enum';
export declare class Land extends BaseEntity {
    title: string;
    plotNumber: string;
    area: number;
    location: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    boundaries: string[];
    status: LandStatus;
    description: string;
    documents: object;
    owner: User;
    value: number;
    lastValuationDate: Date;
    isVerified: boolean;
    verifiedBy: User;
    verificationDate: Date;
}
