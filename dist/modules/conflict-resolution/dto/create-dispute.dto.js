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
exports.CreateDisputeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const land_dispute_entity_1 = require("../entities/land-dispute.entity");
class CreateDisputeDto {
    landId;
    complainantId;
    respondentIds;
    type;
    description;
    evidence;
    requiresFieldVisit;
    complainant;
    respondents;
}
exports.CreateDisputeDto = CreateDisputeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the land in dispute' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDisputeDto.prototype, "landId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the complainant' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDisputeDto.prototype, "complainantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IDs of the respondents' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateDisputeDto.prototype, "respondentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: land_dispute_entity_1.DisputeType, description: 'Type of dispute' }),
    (0, class_validator_1.IsEnum)(land_dispute_entity_1.DisputeType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDisputeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the dispute' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDisputeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Evidence supporting the dispute' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDisputeDto.prototype, "evidence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether a field visit is required' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDisputeDto.prototype, "requiresFieldVisit", void 0);
//# sourceMappingURL=create-dispute.dto.js.map