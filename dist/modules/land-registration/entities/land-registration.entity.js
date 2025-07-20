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
exports.LandRegistration = exports.LandStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var LandStatus;
(function (LandStatus) {
    LandStatus["PENDING_REGISTRATION"] = "pending_registration";
    LandStatus["REGISTERED"] = "registered";
    LandStatus["UNDER_DISPUTE"] = "under_dispute";
    LandStatus["PENDING_TRANSFER"] = "pending_transfer";
    LandStatus["PENDING_CONSTRUCTION"] = "pending_construction";
})(LandStatus || (exports.LandStatus = LandStatus = {}));
let LandRegistration = class LandRegistration {
    id;
    plotNumber;
    location;
    area;
    description;
    boundaries;
    documents;
    owner;
    isVerified;
    verifiedBy;
    verificationDate;
    status;
    metadata;
    createdAt;
    updatedAt;
};
exports.LandRegistration = LandRegistration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LandRegistration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], LandRegistration.prototype, "plotNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], LandRegistration.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], LandRegistration.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], LandRegistration.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], LandRegistration.prototype, "boundaries", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], LandRegistration.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], LandRegistration.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LandRegistration.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: true }),
    __metadata("design:type", user_entity_1.User)
], LandRegistration.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], LandRegistration.prototype, "verificationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LandStatus,
        default: LandStatus.PENDING_REGISTRATION,
    }),
    __metadata("design:type", String)
], LandRegistration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], LandRegistration.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LandRegistration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LandRegistration.prototype, "updatedAt", void 0);
exports.LandRegistration = LandRegistration = __decorate([
    (0, typeorm_1.Entity)()
], LandRegistration);
//# sourceMappingURL=land-registration.entity.js.map