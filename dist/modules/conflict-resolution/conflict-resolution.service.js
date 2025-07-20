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
const users_service_1 = require("../users/users.service");
const land_status_enum_1 = require("../../common/enums/land-status.enum");
let ConflictResolutionService = class ConflictResolutionService {
    disputeRepository;
    landService;
    usersService;
    constructor(disputeRepository, landService, usersService) {
        this.disputeRepository = disputeRepository;
        this.landService = landService;
        this.usersService = usersService;
    }
    async create(createDisputeDto, complainant) {
        const land = await this.landService.findOne(createDisputeDto.landId);
        const respondents = await Promise.all(createDisputeDto.respondentIds.map(id => this.usersService.findOne(id)));
        const existingDispute = await this.disputeRepository.findOne({
            where: {
                land: { id: land.id },
                status: land_dispute_entity_1.DisputeStatus.PENDING,
            },
        });
        if (existingDispute) {
            throw new common_1.ConflictException('There is already an active dispute for this land');
        }
        const dispute = this.disputeRepository.create({
            ...createDisputeDto,
            land,
            complainant,
            respondents,
            status: land_dispute_entity_1.DisputeStatus.PENDING,
        });
        await this.landService.update(land.id, { status: land_status_enum_1.LandStatus.UNDER_DISPUTE }, land.owner);
        return this.disputeRepository.save(dispute);
    }
    async findAll() {
        return this.disputeRepository.find();
    }
    async findOne(id) {
        const dispute = await this.disputeRepository.findOne({ where: { id } });
        if (!dispute) {
            throw new common_1.NotFoundException(`Dispute with ID "${id}" not found`);
        }
        return dispute;
    }
    async findByUser(userId) {
        return this.disputeRepository.find({
            where: [
                { complainant: { id: userId } },
                { respondents: { id: userId } },
            ],
        });
    }
    async update(id, updateDisputeDto) {
        const dispute = await this.findOne(id);
        if (updateDisputeDto.mediatorId) {
            const mediator = await this.usersService.findOne(updateDisputeDto.mediatorId);
            dispute.mediator = mediator;
        }
        if (updateDisputeDto.status === land_dispute_entity_1.DisputeStatus.RESOLVED) {
            dispute.resolutionDate = new Date();
            await this.landService.update(dispute.land.id, { status: land_status_enum_1.LandStatus.REGISTERED }, dispute.land.owner);
        }
        Object.assign(dispute, updateDisputeDto);
        return this.disputeRepository.save(dispute);
    }
    async addComment(id, comment) {
        const dispute = await this.findOne(id);
        dispute.comments = [...dispute.comments, comment];
        return this.disputeRepository.save(dispute);
    }
    async scheduleFieldVisit(id, date) {
        const dispute = await this.findOne(id);
        dispute.requiresFieldVisit = true;
        dispute.fieldVisitDate = date;
        return this.disputeRepository.save(dispute);
    }
    async submitFieldVisitReport(id, report) {
        const dispute = await this.findOne(id);
        dispute.fieldVisitReport = report;
        return this.disputeRepository.save(dispute);
    }
    async getActiveDisputes() {
        return this.disputeRepository.find({
            where: [
                { status: land_dispute_entity_1.DisputeStatus.PENDING },
                { status: land_dispute_entity_1.DisputeStatus.IN_MEDIATION },
            ],
        });
    }
    async getResolvedDisputes() {
        return this.disputeRepository.find({
            where: { status: land_dispute_entity_1.DisputeStatus.RESOLVED },
        });
    }
};
exports.ConflictResolutionService = ConflictResolutionService;
exports.ConflictResolutionService = ConflictResolutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_dispute_entity_1.LandDispute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService,
        users_service_1.UsersService])
], ConflictResolutionService);
//# sourceMappingURL=conflict-resolution.service.js.map