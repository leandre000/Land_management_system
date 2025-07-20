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
exports.CreatePermitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const construction_permit_entity_1 = require("../entities/construction-permit.entity");
class CreatePermitDto {
    landId;
    applicantId;
    constructionType;
    projectDescription;
    estimatedCost;
    documents;
    applicant;
}
exports.CreatePermitDto = CreatePermitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the land for construction' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "landId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the permit applicant' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "applicantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: construction_permit_entity_1.ConstructionType, description: 'Type of construction' }),
    (0, class_validator_1.IsEnum)(construction_permit_entity_1.ConstructionType),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "constructionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the construction project' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "projectDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimated cost of construction' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePermitDto.prototype, "estimatedCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Supporting documents' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreatePermitDto.prototype, "documents", void 0);
//# sourceMappingURL=create-permit.dto.js.map