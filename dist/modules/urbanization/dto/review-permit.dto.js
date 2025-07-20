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
exports.ReviewPermitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ReviewPermitDto {
    approved;
    reviewComments;
    conditions = [];
    requiresInspection = false;
    permitFee = 0;
    expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
}
exports.ReviewPermitDto = ReviewPermitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether to approve or reject the permit' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ReviewPermitDto.prototype, "approved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Review comments' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReviewPermitDto.prototype, "reviewComments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Conditions for approval' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReviewPermitDto.prototype, "conditions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether inspection is required' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ReviewPermitDto.prototype, "requiresInspection", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Permit fee' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReviewPermitDto.prototype, "permitFee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Permit expiry date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ReviewPermitDto.prototype, "expiryDate", void 0);
//# sourceMappingURL=review-permit.dto.js.map