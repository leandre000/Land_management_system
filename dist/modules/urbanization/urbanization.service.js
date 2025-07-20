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
exports.UrbanizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const construction_permit_entity_1 = require("./entities/construction-permit.entity");
const land_registration_service_1 = require("../land-registration/land-registration.service");
const land_status_enum_1 = require("../../common/enums/land-status.enum");
const schedule_1 = require("@nestjs/schedule");
let UrbanizationService = class UrbanizationService {
    permitRepository;
    landService;
    constructor(permitRepository, landService) {
        this.permitRepository = permitRepository;
        this.landService = landService;
    }
    async create(createPermitDto, applicant) {
        const land = await this.landService.findOne(createPermitDto.landId);
        if (land.owner.id !== applicant.id) {
            throw new common_1.ConflictException('You do not own this land');
        }
        if (!land.isVerified || land.status !== land_status_enum_1.LandStatus.REGISTERED) {
            throw new common_1.ConflictException('Land must be registered and verified before applying for construction permit');
        }
        const existingPermit = await this.permitRepository.findOne({
            where: {
                land: { id: land.id },
                status: construction_permit_entity_1.PermitStatus.PENDING,
            },
        });
        if (existingPermit) {
            throw new common_1.ConflictException('There is already a pending permit for this land');
        }
        const permit = this.permitRepository.create({
            ...createPermitDto,
            land,
            applicant,
            status: construction_permit_entity_1.PermitStatus.PENDING,
        });
        await this.landService.update(land.id, { status: land_status_enum_1.LandStatus.PENDING_CONSTRUCTION }, land.owner);
        return this.permitRepository.save(permit);
    }
    async findAll() {
        return this.permitRepository.find();
    }
    async findOne(id) {
        const permit = await this.permitRepository.findOne({ where: { id } });
        if (!permit) {
            throw new common_1.NotFoundException(`Construction permit with ID "${id}" not found`);
        }
        return permit;
    }
    async findByUser(userId) {
        return this.permitRepository.find({
            where: { applicant: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async review(id, reviewPermitDto, reviewer) {
        const permit = await this.findOne(id);
        if (permit.status !== construction_permit_entity_1.PermitStatus.PENDING) {
            throw new common_1.ConflictException('Permit is not in pending status');
        }
        permit.status = reviewPermitDto.approved ? construction_permit_entity_1.PermitStatus.APPROVED : construction_permit_entity_1.PermitStatus.REJECTED;
        permit.reviewedBy = reviewer;
        permit.reviewComments = reviewPermitDto.reviewComments;
        permit.conditions = reviewPermitDto.conditions || [];
        permit.requiresInspection = reviewPermitDto.requiresInspection || false;
        permit.permitFee = reviewPermitDto.permitFee || 0;
        if (reviewPermitDto.approved) {
            permit.approvalDate = new Date();
            permit.expiryDate = reviewPermitDto.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
            await this.landService.update(permit.land.id, { status: land_status_enum_1.LandStatus.CONSTRUCTION_APPROVED }, permit.land.owner);
        }
        else {
            await this.landService.update(permit.land.id, { status: land_status_enum_1.LandStatus.REGISTERED }, permit.land.owner);
        }
        return this.permitRepository.save(permit);
    }
    async recordPayment(id) {
        const permit = await this.findOne(id);
        if (permit.status !== construction_permit_entity_1.PermitStatus.APPROVED) {
            throw new common_1.ConflictException('Permit must be approved before recording payment');
        }
        if (permit.feesPaid) {
            throw new common_1.ConflictException('Permit fees have already been paid');
        }
        permit.feesPaid = true;
        return this.permitRepository.save(permit);
    }
    async scheduleInspection(id, date) {
        const permit = await this.findOne(id);
        if (!permit.requiresInspection) {
            throw new common_1.ConflictException('This permit does not require inspection');
        }
        permit.inspectionDate = date;
        return this.permitRepository.save(permit);
    }
    async submitInspectionReport(id, report) {
        const permit = await this.findOne(id);
        if (!permit.requiresInspection) {
            throw new common_1.ConflictException('This permit does not require inspection');
        }
        permit.inspectionReport = report;
        return this.permitRepository.save(permit);
    }
    async checkExpiredPermits() {
        const expiredPermits = await this.permitRepository.find({
            where: {
                status: construction_permit_entity_1.PermitStatus.APPROVED,
                expiryDate: (0, typeorm_2.LessThan)(new Date()),
            },
        });
        for (const permit of expiredPermits) {
            permit.status = construction_permit_entity_1.PermitStatus.EXPIRED;
            await this.permitRepository.save(permit);
            await this.landService.update(permit.land.id, { status: land_status_enum_1.LandStatus.REGISTERED }, permit.land.owner);
        }
    }
    async getPendingPermits() {
        return this.permitRepository.find({
            where: { status: construction_permit_entity_1.PermitStatus.PENDING },
            order: { createdAt: 'ASC' },
        });
    }
    async getApprovedPermits() {
        return this.permitRepository.find({
            where: { status: construction_permit_entity_1.PermitStatus.APPROVED },
            order: { approvalDate: 'DESC' },
        });
    }
};
exports.UrbanizationService = UrbanizationService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrbanizationService.prototype, "checkExpiredPermits", null);
exports.UrbanizationService = UrbanizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(construction_permit_entity_1.ConstructionPermit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService])
], UrbanizationService);
//# sourceMappingURL=urbanization.service.js.map