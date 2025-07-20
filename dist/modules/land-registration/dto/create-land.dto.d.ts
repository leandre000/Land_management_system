export declare class CreateLandDto {
    ownerId: string;
    plotNumber: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    area: number;
    title: string;
    boundaries?: string[];
    description?: string;
    documents?: object;
    value?: number;
}
