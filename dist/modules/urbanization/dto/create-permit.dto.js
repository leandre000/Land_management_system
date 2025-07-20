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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const construction_permit_entity_1 = require("../entities/construction-permit.entity");
class CreatePermitDto {
    landId;
    constructionType;
    projectDescription;
    estimatedCost;
    totalArea;
    floors;
    architecturalPlans;
    structuralPlans;
    proposedStartDate;
    proposedEndDate;
}
exports.CreatePermitDto = CreatePermitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the land for construction' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "landId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: construction_permit_entity_1.ConstructionType, description: 'Type of construction' }),
    (0, class_validator_1.IsEnum)(construction_permit_entity_1.ConstructionType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "constructionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the construction project' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePermitDto.prototype, "projectDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estimated cost of construction' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePermitDto.prototype, "estimatedCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total area of construction in square meters' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePermitDto.prototype, "totalArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of floors' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePermitDto.prototype, "floors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Architectural plans' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreatePermitDto.prototype, "architecturalPlans", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Structural plans' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreatePermitDto.prototype, "structuralPlans", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proposed start date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreatePermitDto.prototype, "proposedStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Proposed end date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreatePermitDto.prototype, "proposedEndDate", void 0);
//# sourceMappingURL=create-permit.dto.js.map