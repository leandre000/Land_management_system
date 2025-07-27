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
exports.CreateLandGeoJsonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateLandGeoJsonDto {
    ownerId;
    plotNumber;
    title;
    address;
    description;
    documents;
    value;
    geoJson;
}
exports.CreateLandGeoJsonDto = CreateLandGeoJsonDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Owner ID (automatically set from JWT token if not provided)' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLandGeoJsonDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLandGeoJsonDto.prototype, "plotNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLandGeoJsonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLandGeoJsonDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLandGeoJsonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateLandGeoJsonDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLandGeoJsonDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GeoJSON Feature representing the land parcel polygon',
        example: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[[30.1, -1.9], [30.2, -1.9], [30.2, -1.8], [30.1, -1.8], [30.1, -1.9]]]
            },
            properties: {
                name: 'Sample Parcel'
            }
        }
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateLandGeoJsonDto.prototype, "geoJson", void 0);
//# sourceMappingURL=create-land-geojson.dto.js.map