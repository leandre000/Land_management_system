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
const user_entity_1 = require("../../users/entities/user.entity");
const land_entity_1 = require("../../land-registration/entities/land.entity");
var PermitStatus;
(function (PermitStatus) {
    PermitStatus["PENDING"] = "pending";
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
let ConstructionPermit = class ConstructionPermit {
    id;
    land;
    applicant;
    constructionType;
    projectDescription;
    estimatedCost;
    documents;
    status;
    approvalDate;
    rejectedAt;
    rejectionReason;
    permitFee;
    feesPaid;
    requiresInspection;
    inspectionDate;
    inspectionReport;
    conditions;
    expiryDate;
    createdAt;
    updatedAt;
};
exports.ConstructionPermit = ConstructionPermit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "id", void 0);
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
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], ConstructionPermit.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PermitStatus,
        default: PermitStatus.PENDING,
    }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ConstructionPermit.prototype, "permitFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ConstructionPermit.prototype, "feesPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ConstructionPermit.prototype, "requiresInspection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "inspectionDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ConstructionPermit.prototype, "inspectionReport", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], ConstructionPermit.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConstructionPermit.prototype, "updatedAt", void 0);
exports.ConstructionPermit = ConstructionPermit = __decorate([
    (0, typeorm_1.Entity)()
], ConstructionPermit);
//# sourceMappingURL=construction-permit.entity.js.map