"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const land_entity_1 = require("./entities/land.entity");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
const users_service_1 = require("../users/users.service");
const audit_logs_service_1 = require("../audit-logs/audit-logs.service");
const document_generation_service_1 = require("../document-generation/document-generation.service");
const audit_log_entity_1 = require("../audit-logs/entities/audit-log.entity");
const rwanda_national_id_validator_1 = require("../../common/validators/rwanda-national-id.validator");
let LandRegistrationService = class LandRegistrationService {
    landRepository;
    rabbitMQService;
    usersService;
    auditLogsService;
    documentGenerationService;
    constructor(landRepository, rabbitMQService, usersService, auditLogsService, documentGenerationService) {
        this.landRepository = landRepository;
        this.rabbitMQService = rabbitMQService;
        this.usersService = usersService;
        this.auditLogsService = auditLogsService;
        this.documentGenerationService = documentGenerationService;
    }
    async create(createLandDto) {
        const owner = await this.usersService.findOne(createLandDto.ownerId);
        const { latitude, longitude, address } = createLandDto;
        const existingLand = await this.landRepository.findOne({
            where: [
                { geometry: { type: 'Point', coordinates: [longitude, latitude] } },
                { address },
            ],
        });
        if (existingLand) {
            throw new common_1.ConflictException('A land record with the same coordinates or address already exists.');
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
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const savedLand = await this.landRepository.save(land);
        await this.auditLogsService.createLog({
            action: audit_log_entity_1.AuditAction.LAND_CREATED,
            entityType: 'Land',
            entityId: savedLand.id,
            newValues: savedLand,
            user: owner,
            description: `Land parcel ${savedLand.plotNumber} created`,
        });
        await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);
        return savedLand;
    }
    async createWithGeoJson(createLandDto, userId) {
        const ownerId = createLandDto.ownerId || userId;
        if (!ownerId) {
            throw new common_1.ConflictException('Owner ID is required');
        }
        const owner = await this.usersService.findOne(ownerId);
        const { geoJson } = createLandDto;
        if (geoJson.type !== 'Feature' || geoJson.geometry.type !== 'Polygon') {
            throw new common_1.ConflictException('GeoJSON must be a Feature with Polygon geometry');
        }
        const calculatedArea = this.documentGenerationService.calculateLandArea(geoJson);
        const coordinates = geoJson.geometry.coordinates[0];
        const coordinateString = coordinates
            .map(coord => `${coord[0]} ${coord[1]}`)
            .join(', ');
        const wkt = `POLYGON((${coordinateString}))`;
        const overlappingLand = await this.landRepository.createQueryBuilder('land')
            .where('ST_Intersects(land.geometry, ST_GeomFromText(:wkt, 4326))', { wkt })
            .getOne();
        if (overlappingLand) {
            throw new common_1.ConflictException(`Land parcel overlaps with existing parcel: ${overlappingLand.plotNumber}`);
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
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const savedLand = await this.landRepository.save(land);
        await this.auditLogsService.createLog({
            action: audit_log_entity_1.AuditAction.GEOJSON_PROCESSED,
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
        await this.rabbitMQService.handleGeoJsonProcessed(savedLand.id, geoJson, { area: calculatedArea, wkt });
        await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);
        setTimeout(async () => {
            await this.generateLandCertificate(savedLand.id, userId);
        }, 1000);
        return savedLand;
    }
    async generateLandCertificate(landId, userId) {
        const land = await this.findOne(landId);
        const taxAssessment = await this.getTaxAssessmentForLand(landId);
        let mapImage;
        if (land.geoJson) {
            mapImage = await this.documentGenerationService.generateMapPreview(land.geoJson);
        }
        const documentData = {
            land,
            owner: {
                ...land.owner,
                nationalId: land.owner.nationalId ? (0, rwanda_national_id_validator_1.formatRwandaNationalId)(land.owner.nationalId) : null,
            },
            taxAssessment,
            mapImage,
            generatedAt: new Date(),
            documentType: 'OWNERSHIP_CERTIFICATE',
        };
        const pdfBuffer = await this.documentGenerationService.generateLandCertificate(documentData);
        await this.auditLogsService.createLog({
            action: audit_log_entity_1.AuditAction.DOCUMENT_GENERATED,
            entityType: 'Land',
            entityId: landId,
            metadata: {
                documentType: 'OWNERSHIP_CERTIFICATE',
                documentSize: pdfBuffer.length,
            },
            userId,
            description: `Land certificate generated for parcel ${land.plotNumber}`,
        });
        await this.rabbitMQService.handleDocumentGenerationRequest(landId, 'OWNERSHIP_CERTIFICATE', userId || land.owner.id);
        return pdfBuffer;
    }
    async generateLandCertificateHtml(landId, userId) {
        const land = await this.findOne(landId);
        const taxAssessment = await this.getTaxAssessmentForLand(landId);
        let mapImage;
        if (land.geoJson) {
            mapImage = await this.documentGenerationService.generateMapPreview(land.geoJson);
        }
        const documentData = {
            land,
            owner: {
                ...land.owner,
                nationalId: land.owner.nationalId ? (0, rwanda_national_id_validator_1.formatRwandaNationalId)(land.owner.nationalId) : null,
            },
            taxAssessment,
            mapImage,
            generatedAt: new Date(),
            documentType: 'OWNERSHIP_CERTIFICATE',
        };
        const html = await this.documentGenerationService.generateLandCertificateHtml(documentData);
        await this.auditLogsService.createLog({
            action: audit_log_entity_1.AuditAction.DOCUMENT_GENERATED,
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
    async getTaxAssessmentForLand(landId) {
        try {
            const assessment = await this.landRepository.manager
                .createQueryBuilder()
                .select('ta.*')
                .from('tax_assessments', 'ta')
                .where('ta.landId = :landId', { landId })
                .orderBy('ta.assessmentDate', 'DESC')
                .limit(1)
                .getRawOne();
            return assessment;
        }
        catch (error) {
            console.log('No tax assessment found for land:', landId);
            return null;
        }
    }
    async findAll() {
        return this.landRepository.find({
            relations: ['owner'],
        });
    }
    async findOne(id) {
        const land = await this.landRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!land) {
            throw new common_1.NotFoundException(`Land with ID ${id} not found`);
        }
        return land;
    }
    async update(id, updateLandDto) {
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
    async remove(id) {
        const land = await this.findOne(id);
        await this.landRepository.remove(land);
    }
    async verify(id, verifiedBy) {
        const land = await this.findOne(id);
        const verifier = await this.usersService.findOne(verifiedBy);
        land.isVerified = true;
        land.verifiedBy = verifier;
        land.verificationDate = new Date();
        const verifiedLand = await this.landRepository.save(land);
        await this.rabbitMQService.handleLandVerification(id, verifiedLand);
        return verifiedLand;
    }
    async findByOwner(ownerId) {
        return this.landRepository.find({
            where: { owner: { id: ownerId } },
            relations: ['owner'],
        });
    }
    async findByStatus(status) {
        return this.landRepository.find({
            where: { status },
            relations: ['owner'],
        });
    }
    async findNearby(latitude, longitude, radiusMeters = 1000) {
        return this.landRepository.query(`
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
    `, [longitude, latitude, radiusMeters]);
    }
};
exports.LandRegistrationService = LandRegistrationService;
exports.LandRegistrationService = LandRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_entity_1.Land)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rabbitmq_service_1.RabbitMQService,
        users_service_1.UsersService,
        audit_logs_service_1.AuditLogsService,
        document_generation_service_1.DocumentGenerationService])
], LandRegistrationService);
//# sourceMappingURL=land-registration.service.js.map