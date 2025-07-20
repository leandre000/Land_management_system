import { User } from '../../users/entities/user.entity';
export declare enum LandStatus {
    PENDING_REGISTRATION = "pending_registration",
    REGISTERED = "registered",
    UNDER_DISPUTE = "under_dispute",
    PENDING_TRANSFER = "pending_transfer",
    PENDING_CONSTRUCTION = "pending_construction"
}
export declare class LandRegistration {
    id: string;
    plotNumber: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    area: number;
    description: string;
    boundaries: {
        north: string;
        south: string;
        east: string;
        west: string;
    };
    documents: string[];
    owner: User;
    isVerified: boolean;
    verifiedBy: User;
    verificationDate: Date;
    status: LandStatus;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
