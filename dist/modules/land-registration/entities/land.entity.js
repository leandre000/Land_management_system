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
exports.Land = exports.LandStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var LandStatus;
(function (LandStatus) {
    LandStatus["REGISTERED"] = "REGISTERED";
    LandStatus["PENDING_TRANSFER"] = "PENDING_TRANSFER";
    LandStatus["UNDER_DISPUTE"] = "UNDER_DISPUTE";
    LandStatus["PENDING_CONSTRUCTION"] = "PENDING_CONSTRUCTION";
})(LandStatus || (exports.LandStatus = LandStatus = {}));
let Land = class Land {
    id;
    plotNumber;
    coordinates;
    address;
    area;
    title;
    boundaries;
    description;
    documents;
    value;
    status;
    owner;
    verifiedBy;
    verificationDate;
    isVerified;
    createdAt;
    updatedAt;
};
exports.Land = Land;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Land.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Land.prototype, "plotNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], Land.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Land.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Land.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Land.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Land.prototype, "boundaries", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Land.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Land.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Land.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LandStatus,
        default: LandStatus.REGISTERED,
    }),
    __metadata("design:type", String)
], Land.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Land.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: true }),
    __metadata("design:type", user_entity_1.User)
], Land.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Land.prototype, "verificationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Land.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Land.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Land.prototype, "updatedAt", void 0);
exports.Land = Land = __decorate([
    (0, typeorm_1.Entity)('lands')
], Land);
//# sourceMappingURL=land.entity.js.map