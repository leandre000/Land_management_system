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
const land_status_enum_1 = require("../../common/enums/land-status.enum");
let LandRegistrationService = class LandRegistrationService {
    landRepository;
    constructor(landRepository) {
        this.landRepository = landRepository;
    }
    async create(createLandDto, owner) {
        const existingLand = await this.landRepository.findOne({
            where: { plotNumber: createLandDto.plotNumber },
        });
        if (existingLand) {
            throw new common_1.ConflictException('Plot number already exists');
        }
        const land = this.landRepository.create({
            ...createLandDto,
            owner,
            status: land_status_enum_1.LandStatus.PENDING_REGISTRATION,
        });
        return this.landRepository.save(land);
    }
    async findAll() {
        return this.landRepository.find();
    }
    async findOne(id) {
        const land = await this.landRepository.findOne({ where: { id } });
        if (!land) {
            throw new common_1.NotFoundException(`Land with ID "${id}" not found`);
        }
        return land;
    }
    async findByOwner(ownerId) {
        return this.landRepository.find({
            where: { owner: { id: ownerId } },
        });
    }
    async update(id, updateLandDto, user) {
        const land = await this.findOne(id);
        if (land.owner.id !== user.id) {
            throw new common_1.ConflictException('You are not authorized to update this land');
        }
        if (updateLandDto.plotNumber && updateLandDto.plotNumber !== land.plotNumber) {
            const existingLand = await this.landRepository.findOne({
                where: { plotNumber: updateLandDto.plotNumber },
            });
            if (existingLand) {
                throw new common_1.ConflictException('Plot number already exists');
            }
        }
        Object.assign(land, updateLandDto);
        return this.landRepository.save(land);
    }
    async verify(id, verifyLandDto, verifier) {
        const land = await this.findOne(id);
        if (land.isVerified) {
            throw new common_1.ConflictException('Land is already verified');
        }
        land.isVerified = verifyLandDto.isVerified;
        land.verifiedBy = verifier;
        land.verificationDate = new Date();
        land.status = verifyLandDto.isVerified ? land_status_enum_1.LandStatus.REGISTERED : land_status_enum_1.LandStatus.PENDING_REGISTRATION;
        return this.landRepository.save(land);
    }
    async remove(id, user) {
        const land = await this.findOne(id);
        if (land.owner.id !== user.id) {
            throw new common_1.ConflictException('You are not authorized to delete this land');
        }
        const result = await this.landRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Land with ID "${id}" not found`);
        }
    }
};
exports.LandRegistrationService = LandRegistrationService;
exports.LandRegistrationService = LandRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_entity_1.Land)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LandRegistrationService);
//# sourceMappingURL=land-registration.service.js.map