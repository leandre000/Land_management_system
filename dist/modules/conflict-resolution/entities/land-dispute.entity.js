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
exports.LandDispute = exports.DisputeType = exports.DisputeStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const land_entity_1 = require("../../land-registration/entities/land.entity");
var DisputeStatus;
(function (DisputeStatus) {
    DisputeStatus["PENDING"] = "pending";
    DisputeStatus["IN_MEDIATION"] = "in_mediation";
    DisputeStatus["RESOLVED"] = "resolved";
    DisputeStatus["CANCELLED"] = "cancelled";
})(DisputeStatus || (exports.DisputeStatus = DisputeStatus = {}));
var DisputeType;
(function (DisputeType) {
    DisputeType["BOUNDARY"] = "boundary";
    DisputeType["OWNERSHIP"] = "ownership";
    DisputeType["INHERITANCE"] = "inheritance";
    DisputeType["ENCROACHMENT"] = "encroachment";
    DisputeType["OTHER"] = "other";
})(DisputeType || (exports.DisputeType = DisputeType = {}));
let LandDispute = class LandDispute {
    id;
    land;
    complainant;
    mediator;
    respondents;
    type;
    description;
    evidence;
    status;
    resolution;
    resolvedAt;
    comments;
    requiresFieldVisit;
    fieldVisitDate;
    fieldVisitReport;
    createdAt;
    updatedAt;
};
exports.LandDispute = LandDispute;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LandDispute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => land_entity_1.Land, { eager: true }),
    __metadata("design:type", land_entity_1.Land)
], LandDispute.prototype, "land", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], LandDispute.prototype, "complainant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true, nullable: true }),
    __metadata("design:type", user_entity_1.User)
], LandDispute.prototype, "mediator", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], LandDispute.prototype, "respondents", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DisputeType,
    }),
    __metadata("design:type", String)
], LandDispute.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], LandDispute.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], LandDispute.prototype, "evidence", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DisputeStatus,
        default: DisputeStatus.PENDING,
    }),
    __metadata("design:type", String)
], LandDispute.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], LandDispute.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LandDispute.prototype, "resolvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], LandDispute.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LandDispute.prototype, "requiresFieldVisit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LandDispute.prototype, "fieldVisitDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], LandDispute.prototype, "fieldVisitReport", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LandDispute.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LandDispute.prototype, "updatedAt", void 0);
exports.LandDispute = LandDispute = __decorate([
    (0, typeorm_1.Entity)()
], LandDispute);
//# sourceMappingURL=land-dispute.entity.js.map