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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxAssessment = exports.TaxStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const land_entity_1 = require("../../land-registration/entities/land.entity");
var TaxStatus;
(function (TaxStatus) {
    TaxStatus["PENDING"] = "pending";
    TaxStatus["PAID"] = "paid";
    TaxStatus["OVERDUE"] = "overdue";
    TaxStatus["DISPUTED"] = "disputed";
})(TaxStatus || (exports.TaxStatus = TaxStatus = {}));
let TaxAssessment = class TaxAssessment extends base_entity_1.BaseEntity {
    land;
    assessedValue;
    taxRate;
    taxAmount;
    assessmentDate;
    dueDate;
    status;
    paidAmount;
    paymentDate;
    notes;
    assessedBy;
    paymentDetails;
    penaltyAmount;
};
exports.TaxAssessment = TaxAssessment;
__decorate([
    (0, typeorm_1.ManyToOne)(() => land_entity_1.Land, { eager: true }),
    __metadata("design:type", land_entity_1.Land)
], TaxAssessment.prototype, "land", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TaxAssessment.prototype, "assessedValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], TaxAssessment.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TaxAssessment.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TaxAssessment.prototype, "assessmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TaxAssessment.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TaxStatus,
        default: TaxStatus.PENDING,
    }),
    __metadata("design:type", String)
], TaxAssessment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], TaxAssessment.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], TaxAssessment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TaxAssessment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], TaxAssessment.prototype, "assessedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], TaxAssessment.prototype, "paymentDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], TaxAssessment.prototype, "penaltyAmount", void 0);
exports.TaxAssessment = TaxAssessment = __decorate([
    (0, typeorm_1.Entity)('tax_assessments')
], TaxAssessment);
//# sourceMappingURL=tax-assessment.entity.js.map