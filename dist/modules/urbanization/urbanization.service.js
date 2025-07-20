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
const notifications_service_1 = require("../notifications/notifications.service");
const land_entity_1 = require("../land-registration/entities/land.entity");
const users_service_1 = require("../users/users.service");
let UrbanizationService = class UrbanizationService {
    permitRepository;
    landService;
    notificationsService;
    usersService;
    constructor(permitRepository, landService, notificationsService, usersService) {
        this.permitRepository = permitRepository;
        this.landService = landService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async create(createPermitDto) {
        const [land, applicant] = await Promise.all([
            this.landService.findOne(createPermitDto.landId),
            this.usersService.findOne(createPermitDto.applicantId),
        ]);
        if (land.status === land_entity_1.LandStatus.UNDER_DISPUTE) {
            throw new common_1.ConflictException('Cannot apply for construction permit while land is under dispute');
        }
        if (land.status === land_entity_1.LandStatus.PENDING_TRANSFER) {
            throw new common_1.ConflictException('Cannot apply for construction permit while land transfer is pending');
        }
        const permit = this.permitRepository.create({
            ...createPermitDto,
            land,
            applicant,
            status: construction_permit_entity_1.PermitStatus.PENDING,
        });
        const savedPermit = await this.permitRepository.save(permit);
        await this.landService.update(land.id, {
            status: land_entity_1.LandStatus.PENDING_CONSTRUCTION,
        });
        await this.notificationsService.sendNotification(savedPermit.applicant.id, notifications_service_1.NotificationType.PERMIT_APPLIED, {
            permitId: savedPermit.id,
            landId: land.id,
            plotNumber: land.plotNumber,
            constructionType: permit.constructionType,
        });
        return savedPermit;
    }
    async findAll() {
        return this.permitRepository.find({
            relations: ['land', 'applicant'],
        });
    }
    async findOne(id) {
        const permit = await this.permitRepository.findOne({
            where: { id },
            relations: ['land', 'applicant'],
        });
        if (!permit) {
            throw new common_1.NotFoundException(`Construction permit with ID ${id} not found`);
        }
        return permit;
    }
    async update(id, updatePermitDto) {
        const permit = await this.findOne(id);
        Object.assign(permit, updatePermitDto);
        return this.permitRepository.save(permit);
    }
    async remove(id) {
        const permit = await this.findOne(id);
        await this.permitRepository.remove(permit);
    }
    async approve(id) {
        const permit = await this.findOne(id);
        permit.status = construction_permit_entity_1.PermitStatus.APPROVED;
        permit.approvalDate = new Date();
        permit.expiryDate = new Date();
        permit.expiryDate.setFullYear(permit.expiryDate.getFullYear() + 1);
        await this.landService.update(permit.land.id, {
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const approvedPermit = await this.permitRepository.save(permit);
        await this.notificationsService.sendNotification(permit.applicant.id, notifications_service_1.NotificationType.PERMIT_APPROVED, {
            permitId: approvedPermit.id,
            landId: permit.land.id,
            plotNumber: permit.land.plotNumber,
            constructionType: permit.constructionType,
        });
        return approvedPermit;
    }
    async reject(id, reason) {
        const permit = await this.findOne(id);
        permit.status = construction_permit_entity_1.PermitStatus.REJECTED;
        permit.rejectionReason = reason;
        await this.landService.update(permit.land.id, {
            status: land_entity_1.LandStatus.REGISTERED,
        });
        return this.permitRepository.save(permit);
    }
    async findByStatus(status) {
        return this.permitRepository.find({
            where: { status },
            relations: ['land', 'applicant'],
        });
    }
    async findByApplicant(applicantId) {
        return this.permitRepository.find({
            where: { applicant: { id: applicantId } },
            relations: ['land', 'applicant'],
        });
    }
    async recordInspection(id, report) {
        const permit = await this.findOne(id);
        permit.inspectionReport = report;
        permit.inspectionDate = new Date();
        return this.permitRepository.save(permit);
    }
    async updateFeeStatus(id, paid) {
        const permit = await this.findOne(id);
        permit.feesPaid = paid;
        return this.permitRepository.save(permit);
    }
};
exports.UrbanizationService = UrbanizationService;
exports.UrbanizationService = UrbanizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(construction_permit_entity_1.ConstructionPermit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], UrbanizationService);
//# sourceMappingURL=urbanization.service.js.map