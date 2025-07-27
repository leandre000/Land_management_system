import { LandRegistrationService } from './land-registration.service';
import { CreateLandDto } from './dto/create-land.dto';
import { CreateLandGeoJsonDto } from './dto/create-land-geojson.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { Response } from 'express';
export declare class LandRegistrationController {
    private readonly landRegistrationService;
    constructor(landRegistrationService: LandRegistrationService);
    create(createLandDto: CreateLandDto, req: any): Promise<import("./entities/land.entity").Land>;
    createWithGeoJson(createLandDto: CreateLandGeoJsonDto, req: any): Promise<import("./entities/land.entity").Land>;
    findAll(): Promise<import("./entities/land.entity").Land[]>;
    findNearby(lat: number, lng: number, radius: number): Promise<import("./entities/land.entity").Land[]>;
    findMyLands(req: any): Promise<import("./entities/land.entity").Land[]>;
    findOne(id: string): Promise<import("./entities/land.entity").Land>;
    update(id: string, updateLandDto: UpdateLandDto): Promise<import("./entities/land.entity").Land>;
    remove(id: string): Promise<void>;
    verify(id: string, req: any): Promise<import("./entities/land.entity").Land>;
    generateCertificate(id: string, req: any, res: Response): Promise<void>;
    generateCertificateHtml(id: string, req: any, res: Response): Promise<void>;
}
