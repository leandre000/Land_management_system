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
exports.ConflictResolutionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const land_dispute_entity_1 = require("./entities/land-dispute.entity");
const land_registration_service_1 = require("../land-registration/land-registration.service");
const notifications_service_1 = require("../notifications/notifications.service");
const land_entity_1 = require("../land-registration/entities/land.entity");
const users_service_1 = require("../users/users.service");
let ConflictResolutionService = class ConflictResolutionService {
    disputeRepository;
    landService;
    notificationsService;
    usersService;
    constructor(disputeRepository, landService, notificationsService, usersService) {
        this.disputeRepository = disputeRepository;
        this.landService = landService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async create(createDisputeDto) {
        const [land, complainant, respondents] = await Promise.all([
            this.landService.findOne(createDisputeDto.landId),
            this.usersService.findOne(createDisputeDto.complainantId),
            Promise.all(createDisputeDto.respondentIds.map(id => this.usersService.findOne(id))),
        ]);
        const dispute = this.disputeRepository.create({
            status: land_dispute_entity_1.DisputeStatus.PENDING,
            type: createDisputeDto.type,
            description: createDisputeDto.description,
            evidence: createDisputeDto.evidence || [],
            requiresFieldVisit: createDisputeDto.requiresFieldVisit || false,
        });
        dispute.land = land;
        dispute.complainant = complainant;
        dispute.respondents = respondents;
        const savedDispute = await this.disputeRepository.save(dispute);
        await this.landService.update(land.id, {
            status: land_entity_1.LandStatus.UNDER_DISPUTE
        });
        await this.notificationsService.sendNotification(savedDispute.complainant.id, notifications_service_1.NotificationType.DISPUTE_FILED, {
            disputeId: savedDispute.id,
            landId: land.id,
            plotNumber: land.plotNumber,
        });
        for (const respondent of savedDispute.respondents) {
            await this.notificationsService.sendNotification(respondent.id, notifications_service_1.NotificationType.DISPUTE_FILED, {
                disputeId: savedDispute.id,
                landId: land.id,
                plotNumber: land.plotNumber,
                complainant: savedDispute.complainant,
            });
        }
        return savedDispute;
    }
    async findAll() {
        return this.disputeRepository.find({
            relations: ['land', 'complainant', 'respondents'],
        });
    }
    async findOne(id) {
        const dispute = await this.disputeRepository.findOne({
            where: { id },
            relations: ['land', 'complainant', 'respondents'],
        });
        if (!dispute) {
            throw new common_1.NotFoundException(`Dispute with ID ${id} not found`);
        }
        return dispute;
    }
    async update(id, updateDisputeDto) {
        const dispute = await this.findOne(id);
        Object.assign(dispute, updateDisputeDto);
        return this.disputeRepository.save(dispute);
    }
    async remove(id) {
        const dispute = await this.findOne(id);
        await this.disputeRepository.remove(dispute);
    }
    async resolve(id, resolution) {
        const dispute = await this.findOne(id);
        dispute.status = land_dispute_entity_1.DisputeStatus.RESOLVED;
        dispute.resolution = resolution;
        dispute.resolvedAt = new Date();
        await this.landService.update(dispute.land.id, {
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const resolvedDispute = await this.disputeRepository.save(dispute);
        await this.notificationsService.sendNotification(dispute.complainant.id, notifications_service_1.NotificationType.DISPUTE_RESOLVED, {
            disputeId: resolvedDispute.id,
            landId: dispute.land.id,
            plotNumber: dispute.land.plotNumber,
            resolution,
        });
        for (const respondent of dispute.respondents) {
            await this.notificationsService.sendNotification(respondent.id, notifications_service_1.NotificationType.DISPUTE_RESOLVED, {
                disputeId: resolvedDispute.id,
                landId: dispute.land.id,
                plotNumber: dispute.land.plotNumber,
                resolution,
            });
        }
        return resolvedDispute;
    }
    async findByStatus(status) {
        return this.disputeRepository.find({
            where: { status },
            relations: ['land', 'complainant', 'respondents'],
        });
    }
    async findByParticipant(userId) {
        return this.disputeRepository.find({
            where: [
                { complainant: { id: userId } },
                { respondents: { id: userId } },
            ],
            relations: ['land', 'complainant', 'respondents'],
        });
    }
    async addComment(id, comment) {
        const dispute = await this.findOne(id);
        dispute.comments.push(comment);
        return this.disputeRepository.save(dispute);
    }
    async recordFieldVisit(id, report) {
        const dispute = await this.findOne(id);
        dispute.requiresFieldVisit = true;
        dispute.fieldVisitDate = new Date();
        dispute.fieldVisitReport = report;
        return this.disputeRepository.save(dispute);
    }
};
exports.ConflictResolutionService = ConflictResolutionService;
exports.ConflictResolutionService = ConflictResolutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_dispute_entity_1.LandDispute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], ConflictResolutionService);
//# sourceMappingURL=conflict-resolution.service.js.map