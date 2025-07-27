import { User } from '../../users/entities/user.entity';
export declare enum LandStatus {
    REGISTERED = "REGISTERED",
    PENDING_TRANSFER = "PENDING_TRANSFER",
    UNDER_DISPUTE = "UNDER_DISPUTE",
    PENDING_CONSTRUCTION = "PENDING_CONSTRUCTION"
}
export declare class Land {
    id: string;
    plotNumber: string;
    geometry: any;
    geoJson?: object;
    address?: string;
    area: number;
    title: string;
    boundaries?: string[];
    description?: string;
    documents?: object;
    value?: number;
    status: LandStatus;
    owner: User;
    verifiedBy?: User;
    verificationDate?: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
