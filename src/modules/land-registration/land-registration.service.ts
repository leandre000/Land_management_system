import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Land, LandStatus } from './entities/land.entity';
import { CreateLandDto } from './dto/create-land.dto';
import { CreateLandGeoJsonDto } from './dto/create-land-geojson.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { UsersService } from '../users/users.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { DocumentGenerationService } from '../document-generation/document-generation.service';
import { AuditAction } from '../audit-logs/entities/audit-log.entity';
import { formatRwandaNationalId } from '../../common/validators/rwanda-national-id.validator';

@Injectable()
export class LandRegistrationService {
  constructor(
    @InjectRepository(Land)
    private readonly landRepository: Repository<Land>,
    private readonly rabbitMQService: RabbitMQService,
    private readonly usersService: UsersService,
    private readonly auditLogsService: AuditLogsService,
    private readonly documentGenerationService: DocumentGenerationService,
  ) {}

  async create(createLandDto: CreateLandDto): Promise<Land> {
    const owner = await this.usersService.findOne(createLandDto.ownerId);
    const { latitude, longitude, address } = createLandDto;

    const existingLand = await this.landRepository.findOne({
      where: [
        { geometry: { type: 'Point', coordinates: [longitude, latitude] } },
        { address },
      ],
    });

    if (existingLand) {
      throw new ConflictException(
        'A land record with the same coordinates or address already exists.',
      );
    }

    const geometry = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const land = this.landRepository.create({
      ...createLandDto,
      geometry,
      address,
      owner,
      status: LandStatus.REGISTERED,
    });

    const savedLand = await this.landRepository.save(land);
    
    // Create audit log
    await this.auditLogsService.createLog({
      action: AuditAction.LAND_CREATED,
      entityType: 'Land',
      entityId: savedLand.id,
      newValues: savedLand,
      user: owner,
      description: `Land parcel ${savedLand.plotNumber} created`,
    });

    await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);

    return savedLand;
  }

  async createWithGeoJson(createLandDto: CreateLandGeoJsonDto, userId?: string): Promise<Land> {
    // Use ownerId from DTO or fallback to userId from JWT
    const ownerId = createLandDto.ownerId || userId;
    if (!ownerId) {
      throw new ConflictException('Owner ID is required');
    }
    
    const owner = await this.usersService.findOne(ownerId);
    const { geoJson } = createLandDto;

    // Validate GeoJSON
    if (geoJson.type !== 'Feature' || geoJson.geometry.type !== 'Polygon') {
      throw new ConflictException('GeoJSON must be a Feature with Polygon geometry');
    }

    // Calculate area from GeoJSON
    const calculatedArea = this.documentGenerationService.calculateLandArea(geoJson);

    // Convert GeoJSON polygon coordinates to WKT format manually
    const coordinates = geoJson.geometry.coordinates[0];
    const coordinateString = coordinates
      .map(coord => `${coord[0]} ${coord[1]}`)
      .join(', ');
    const wkt = `POLYGON((${coordinateString}))`;

    // Check for overlapping land parcels
    const overlappingLand = await this.landRepository.createQueryBuilder('land')
      .where('ST_Intersects(land.geometry, ST_GeomFromText(:wkt, 4326))', { wkt })
      .getOne();

    if (overlappingLand) {
      throw new ConflictException(
        `Land parcel overlaps with existing parcel: ${overlappingLand.plotNumber}`,
      );
    }

    const land = this.landRepository.create({
      plotNumber: createLandDto.plotNumber,
      title: createLandDto.title,
      address: createLandDto.address,
      description: createLandDto.description,
      documents: createLandDto.documents,
      value: createLandDto.value,
      area: calculatedArea,
      geometry: () => `ST_GeomFromText('${wkt}', 4326)`,
      geoJson: geoJson,
      owner,
      status: LandStatus.REGISTERED,
    });

    const savedLand = await this.landRepository.save(land);

    // Create audit log
    await this.auditLogsService.createLog({
      action: AuditAction.GEOJSON_PROCESSED,
      entityType: 'Land',
      entityId: savedLand.id,
      newValues: savedLand,
      metadata: {
        geoJsonArea: calculatedArea,
        coordinatesCount: geoJson.geometry.coordinates[0].length,
      },
      user: owner,
      description: `Land parcel ${savedLand.plotNumber} created from GeoJSON with area ${calculatedArea}m²`,
    });

    // Trigger events
    await this.rabbitMQService.handleGeoJsonProcessed(
      savedLand.id,
      geoJson,
      { area: calculatedArea, wkt }
    );

    await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);

    // Generate document after a short delay to ensure all data is saved
    setTimeout(async () => {
      await this.generateLandCertificate(savedLand.id, userId);
    }, 1000);

    return savedLand;
  }

  async generateLandCertificate(landId: string, userId?: string): Promise<Buffer> {
    const land = await this.findOne(landId);
    
    // Get the most recent tax assessment if available
    const taxAssessment = await this.getTaxAssessmentForLand(landId);

    // Generate map preview if GeoJSON exists
    let mapImage: string | undefined;
    if (land.geoJson) {
      mapImage = await this.documentGenerationService.generateMapPreview(land.geoJson);
    }

    const documentData = {
      land,
      owner: {
        ...land.owner,
        nationalId: land.owner.nationalId ? formatRwandaNationalId(land.owner.nationalId) : null,
      } as any,
      taxAssessment,
      mapImage,
      generatedAt: new Date(),
      documentType: 'OWNERSHIP_CERTIFICATE' as const,
    };

    const pdfBuffer = await this.documentGenerationService.generateLandCertificate(documentData);

    // Create audit log for document generation
    await this.auditLogsService.createLog({
      action: AuditAction.DOCUMENT_GENERATED,
      entityType: 'Land',
      entityId: landId,
      metadata: {
        documentType: 'OWNERSHIP_CERTIFICATE',
        documentSize: pdfBuffer.length,
      },
      userId,
      description: `Land certificate generated for parcel ${land.plotNumber}`,
    });

    // Trigger RabbitMQ event
    await this.rabbitMQService.handleDocumentGenerationRequest(
      landId,
      'OWNERSHIP_CERTIFICATE',
      userId || land.owner.id
    );

    return pdfBuffer;
  }

  async generateLandCertificateHtml(landId: string, userId?: string): Promise<string> {
    const land = await this.findOne(landId);
    
    // Get the most recent tax assessment if available
    const taxAssessment = await this.getTaxAssessmentForLand(landId);

    // Generate map preview if GeoJSON exists
    let mapImage: string | undefined;
    if (land.geoJson) {
      mapImage = await this.documentGenerationService.generateMapPreview(land.geoJson);
    }

    const documentData = {
      land,
      owner: {
        ...land.owner,
        nationalId: land.owner.nationalId ? formatRwandaNationalId(land.owner.nationalId) : null,
      } as any,
      taxAssessment,
      mapImage,
      generatedAt: new Date(),
      documentType: 'OWNERSHIP_CERTIFICATE' as const,
    };

    // Generate HTML only (no PDF)
    const html = await this.documentGenerationService.generateLandCertificateHtml(documentData);

    // Create audit log for HTML generation
    await this.auditLogsService.createLog({
      action: AuditAction.DOCUMENT_GENERATED,
      entityType: 'Land',
      entityId: landId,
      metadata: {
        documentType: 'HTML_CERTIFICATE',
        format: 'HTML',
      },
      userId,
      description: `Land certificate HTML generated for parcel ${land.plotNumber}`,
    });

    return html;
  }

  private async getTaxAssessmentForLand(landId: string): Promise<any> {
    try {
      // Try to find the most recent tax assessment for this land
      const assessment = await this.landRepository.manager
        .createQueryBuilder()
        .select('ta.*')
        .from('tax_assessments', 'ta')
        .where('ta.landId = :landId', { landId })
        .orderBy('ta.assessmentDate', 'DESC')
        .limit(1)
        .getRawOne();
      
      return assessment;
    } catch (error) {
      console.log('No tax assessment found for land:', landId);
      return null;
    }
  }


  async findAll(): Promise<Land[]> {
    return this.landRepository.find({
      relations: ['owner'],
    });
  }



  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!land) {
      throw new NotFoundException(`Land with ID ${id} not found`);
    }

    return land;
  }

  async update(id: string, updateLandDto: UpdateLandDto): Promise<Land> {
    const land = await this.findOne(id);

    if (updateLandDto.ownerId) {
      const newOwner = await this.usersService.findOne(updateLandDto.ownerId);
      land.owner = newOwner;
    }

    Object.assign(land, updateLandDto);
    const updatedLand = await this.landRepository.save(land);

    await this.rabbitMQService.handleLandUpdate(id, {
      ...updatedLand,
      changes: updateLandDto,
    });

    return updatedLand;
  }

  async remove(id: string): Promise<void> {
    const land = await this.findOne(id);
    await this.landRepository.remove(land);
  }

  async verify(id: string, verifiedBy: string): Promise<Land> {
    const land = await this.findOne(id);
    const verifier = await this.usersService.findOne(verifiedBy);

    land.isVerified = true;
    land.verifiedBy = verifier;
    land.verificationDate = new Date();

    const verifiedLand = await this.landRepository.save(land);
    await this.rabbitMQService.handleLandVerification(id, verifiedLand);

    return verifiedLand;
  }

  async findByOwner(ownerId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  async findByStatus(status: LandStatus): Promise<Land[]> {
    return this.landRepository.find({
      where: { status },
      relations: ['owner'],
    });
  }

  async findNearby(latitude: number, longitude: number, radiusMeters = 1000): Promise<Land[]> {
  return this.landRepository.query(
    `
    SELECT *
    FROM lands
    WHERE ST_DWithin(
      coordinates::geography,
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
      $3
    )
    ORDER BY ST_Distance(
      coordinates::geography,
      ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
    )  
    `,
    [longitude, latitude, radiusMeters]
  );
}

} 