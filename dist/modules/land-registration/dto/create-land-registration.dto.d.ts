import { User } from '../../users/entities/user.entity';
export declare class LocationDto {
    latitude: number;
    longitude: number;
    address: string;
}
export declare class BoundariesDto {
    north: string;
    south: string;
    east: string;
    west: string;
}
export declare class CreateLandRegistrationDto {
    plotNumber: string;
    location: LocationDto;
    area: number;
    description: string;
    boundaries?: BoundariesDto;
    documents?: string[];
    metadata?: Record<string, any>;
    owner?: User;
}
