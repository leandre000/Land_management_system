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
let LandRegistrationService = class LandRegistrationService {
    landRepository;
    rabbitMQService;
    usersService;
    constructor(landRepository, rabbitMQService, usersService) {
        this.landRepository = landRepository;
        this.rabbitMQService = rabbitMQService;
        this.usersService = usersService;
    }
    async create(createLandDto) {
        const owner = await this.usersService.findOne(createLandDto.ownerId);
        const { latitude, longitude, address } = createLandDto;
        const coordinates = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        const land = this.landRepository.create({
            ...createLandDto,
            coordinates,
            address,
            owner,
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const savedLand = await this.landRepository.save(land);
        await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);
        return savedLand;
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
        users_service_1.UsersService])
], LandRegistrationService);
//# sourceMappingURL=land-registration.service.js.map