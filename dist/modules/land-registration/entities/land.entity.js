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
exports.Land = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const land_status_enum_1 = require("../../../common/enums/land-status.enum");
let Land = class Land extends base_entity_1.BaseEntity {
    title;
    plotNumber;
    area;
    location;
    coordinates;
    boundaries;
    status;
    description;
    documents;
    owner;
    value;
    lastValuationDate;
    isVerified;
    verifiedBy;
    verificationDate;
};
exports.Land = Land;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Land.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Land.prototype, "plotNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Land.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Land.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], Land.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], Land.prototype, "boundaries", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: land_status_enum_1.LandStatus,
        default: land_status_enum_1.LandStatus.PENDING_REGISTRATION
    }),
    __metadata("design:type", String)
], Land.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Land.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Land.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Land.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Land.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Land.prototype, "lastValuationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Land.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: true }),
    __metadata("design:type", user_entity_1.User)
], Land.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], Land.prototype, "verificationDate", void 0);
exports.Land = Land = __decorate([
    (0, typeorm_1.Entity)('lands')
], Land);
//# sourceMappingURL=land.entity.js.map