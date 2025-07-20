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
exports.LandTaxesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tax_assessment_entity_1 = require("./entities/tax-assessment.entity");
const land_registration_service_1 = require("../land-registration/land-registration.service");
const schedule_1 = require("@nestjs/schedule");
let LandTaxesService = class LandTaxesService {
    taxAssessmentRepository;
    landService;
    constructor(taxAssessmentRepository, landService) {
        this.taxAssessmentRepository = taxAssessmentRepository;
        this.landService = landService;
    }
    async create(createAssessmentDto, assessor) {
        const land = await this.landService.findOne(createAssessmentDto.landId);
        const existingAssessment = await this.taxAssessmentRepository.findOne({
            where: {
                land: { id: land.id },
                status: tax_assessment_entity_1.TaxStatus.PENDING,
            },
        });
        if (existingAssessment) {
            throw new common_1.ConflictException('There is already a pending assessment for this land');
        }
        const taxAmount = (createAssessmentDto.assessedValue * createAssessmentDto.taxRate) / 100;
        const assessment = this.taxAssessmentRepository.create({
            land,
            assessedValue: createAssessmentDto.assessedValue,
            taxRate: createAssessmentDto.taxRate,
            taxAmount,
            assessmentDate: new Date(),
            dueDate: createAssessmentDto.dueDate,
            notes: createAssessmentDto.notes,
            assessedBy: assessor,
        });
        return this.taxAssessmentRepository.save(assessment);
    }
    async findAll() {
        return this.taxAssessmentRepository.find();
    }
    async findOne(id) {
        const assessment = await this.taxAssessmentRepository.findOne({ where: { id } });
        if (!assessment) {
            throw new common_1.NotFoundException(`Tax assessment with ID "${id}" not found`);
        }
        return assessment;
    }
    async findByLand(landId) {
        return this.taxAssessmentRepository.find({
            where: { land: { id: landId } },
            order: { assessmentDate: 'DESC' },
        });
    }
    async findByOwner(ownerId) {
        return this.taxAssessmentRepository.find({
            where: { land: { owner: { id: ownerId } } },
            order: { assessmentDate: 'DESC' },
        });
    }
    async recordPayment(id, recordPaymentDto) {
        const assessment = await this.findOne(id);
        if (assessment.status === tax_assessment_entity_1.TaxStatus.PAID) {
            throw new common_1.ConflictException('Tax has already been paid');
        }
        const totalDue = assessment.taxAmount + assessment.penaltyAmount;
        const totalPaid = assessment.paidAmount + recordPaymentDto.amount;
        if (totalPaid > totalDue) {
            throw new common_1.ConflictException('Payment amount exceeds the total due amount');
        }
        assessment.paidAmount = totalPaid;
        assessment.paymentDate = new Date();
        assessment.paymentDetails = recordPaymentDto.paymentDetails;
        assessment.notes = recordPaymentDto.notes || assessment.notes;
        assessment.status = totalPaid >= totalDue ? tax_assessment_entity_1.TaxStatus.PAID : tax_assessment_entity_1.TaxStatus.PENDING;
        return this.taxAssessmentRepository.save(assessment);
    }
    async checkOverdueTaxes() {
        const overdueAssessments = await this.taxAssessmentRepository.find({
            where: {
                status: tax_assessment_entity_1.TaxStatus.PENDING,
                dueDate: (0, typeorm_2.LessThan)(new Date()),
            },
        });
        for (const assessment of overdueAssessments) {
            const daysOverdue = Math.floor((Date.now() - assessment.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            const penaltyRate = Math.min(daysOverdue * 0.01, 0.2);
            assessment.penaltyAmount = assessment.taxAmount * penaltyRate;
            assessment.status = tax_assessment_entity_1.TaxStatus.OVERDUE;
            await this.taxAssessmentRepository.save(assessment);
        }
    }
    async getOverdueTaxes() {
        return this.taxAssessmentRepository.find({
            where: { status: tax_assessment_entity_1.TaxStatus.OVERDUE },
            order: { dueDate: 'ASC' },
        });
    }
};
exports.LandTaxesService = LandTaxesService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LandTaxesService.prototype, "checkOverdueTaxes", null);
exports.LandTaxesService = LandTaxesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tax_assessment_entity_1.TaxAssessment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService])
], LandTaxesService);
//# sourceMappingURL=land-taxes.service.js.map