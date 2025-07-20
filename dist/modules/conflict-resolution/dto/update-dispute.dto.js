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
exports.UpdateDisputeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const land_dispute_entity_1 = require("../entities/land-dispute.entity");
const class_transformer_1 = require("class-transformer");
class UpdateDisputeDto {
    status;
    mediatorId;
    mediationDate;
    resolution;
    comments;
    fieldVisitDate;
    fieldVisitReport;
    evidence;
}
exports.UpdateDisputeDto = UpdateDisputeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: land_dispute_entity_1.DisputeStatus, description: 'Status of the dispute' }),
    (0, class_validator_1.IsEnum)(land_dispute_entity_1.DisputeStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDisputeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the mediator' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDisputeDto.prototype, "mediatorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Mediation date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateDisputeDto.prototype, "mediationDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Resolution details' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDisputeDto.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Comments on the dispute' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateDisputeDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Field visit date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateDisputeDto.prototype, "fieldVisitDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Field visit report' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDisputeDto.prototype, "fieldVisitReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional evidence' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateDisputeDto.prototype, "evidence", void 0);
//# sourceMappingURL=update-dispute.dto.js.map