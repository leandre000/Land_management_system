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
exports.LandTransfer = exports.TransferStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const land_entity_1 = require("../../land-registration/entities/land.entity");
var TransferStatus;
(function (TransferStatus) {
    TransferStatus["PENDING"] = "PENDING";
    TransferStatus["APPROVED"] = "APPROVED";
    TransferStatus["REJECTED"] = "REJECTED";
})(TransferStatus || (exports.TransferStatus = TransferStatus = {}));
let LandTransfer = class LandTransfer {
    id;
    land;
    fromOwner;
    toOwner;
    status;
    transferAmount;
    documents;
    reason;
    rejectionReason;
    approvalDate;
    createdAt;
    updatedAt;
};
exports.LandTransfer = LandTransfer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LandTransfer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => land_entity_1.Land, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", land_entity_1.Land)
], LandTransfer.prototype, "land", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], LandTransfer.prototype, "fromOwner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], LandTransfer.prototype, "toOwner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TransferStatus,
        default: TransferStatus.PENDING,
    }),
    __metadata("design:type", String)
], LandTransfer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], LandTransfer.prototype, "transferAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], LandTransfer.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LandTransfer.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LandTransfer.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LandTransfer.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LandTransfer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LandTransfer.prototype, "updatedAt", void 0);
exports.LandTransfer = LandTransfer = __decorate([
    (0, typeorm_1.Entity)('land_transfers')
], LandTransfer);
//# sourceMappingURL=land-transfer.entity.js.map