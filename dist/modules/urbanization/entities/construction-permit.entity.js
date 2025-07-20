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
exports.ConstructionPermit = exports.ConstructionType = exports.PermitStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const land_entity_1 = require("../../land-registration/entities/land.entity");
var PermitStatus;
(function (PermitStatus) {
    PermitStatus["PENDING"] = "pending";
    PermitStatus["IN_REVIEW"] = "in_review";
    PermitStatus["APPROVED"] = "approved";
    PermitStatus["REJECTED"] = "rejected";
    PermitStatus["EXPIRED"] = "expired";
})(PermitStatus || (exports.PermitStatus = PermitStatus = {}));
var ConstructionType;
(function (ConstructionType) {
    ConstructionType["RESIDENTIAL"] = "residential";
    ConstructionType["COMMERCIAL"] = "commercial";
    ConstructionType["INDUSTRIAL"] = "industrial";
    ConstructionType["MIXED_USE"] = "mixed_use";
    ConstructionType["OTHER"] = "other";
})(ConstructionType || (exports.ConstructionType = ConstructionType = {}));
let ConstructionPermit = class ConstructionPermit extends base_entity_1.BaseEntity {
    land;
    applicant;
    constructionType;
    projectDescription;
    estimatedCost;
    totalArea;
    floors;
    status;
    architecturalPlans;
    structuralPlans;
    proposedStartDate;
    proposedEndDate;
    approvalDate;
    expiryDate;
    reviewedBy;
    reviewComments;
    conditions;
    requiresInspection;
    inspectionDate;
    inspectionReport;
    permitFee;
    feesPaid;
};
exports.ConstructionPermit = ConstructionPermit;
__decorate([
    (0, typeorm_1.ManyToOne)(() => land_entity_1.Land, { eager: true }),
    __metadata("design:type", land_entity_1.Land)
], ConstructionPermit.prototype, "land", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], ConstructionPermit.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ConstructionType,
    }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "constructionType", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "projectDescription", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ConstructionPermit.prototype, "estimatedCost", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ConstructionPermit.prototype, "totalArea", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ConstructionPermit.prototype, "floors", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PermitStatus,
        default: PermitStatus.PENDING,
    }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ConstructionPermit.prototype, "architecturalPlans", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ConstructionPermit.prototype, "structuralPlans", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "proposedStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "proposedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: true }),
    __metadata("design:type", user_entity_1.User)
], ConstructionPermit.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "reviewComments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [] }),
    __metadata("design:type", Array)
], ConstructionPermit.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConstructionPermit.prototype, "requiresInspection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "inspectionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "inspectionReport", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ConstructionPermit.prototype, "permitFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ConstructionPermit.prototype, "feesPaid", void 0);
exports.ConstructionPermit = ConstructionPermit = __decorate([
    (0, typeorm_1.Entity)('construction_permits')
], ConstructionPermit);
//# sourceMappingURL=construction-permit.entity.js.map