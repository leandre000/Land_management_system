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
exports.CreateTransferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTransferDto {
    landId;
    toOwnerId;
    transferAmount;
    documents;
    reason;
}
exports.CreateTransferDto = CreateTransferDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the land to transfer' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "landId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the user to transfer the land to' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "toOwnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transfer amount' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTransferDto.prototype, "transferAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Transfer documents' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTransferDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reason for transfer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransferDto.prototype, "reason", void 0);
//# sourceMappingURL=create-transfer.dto.js.map