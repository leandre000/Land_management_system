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
exports.UpdateLandRegistrationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_land_registration_dto_1 = require("./create-land-registration.dto");
const class_validator_1 = require("class-validator");
const land_entity_1 = require("../entities/land.entity");
class UpdateLandRegistrationDto extends (0, mapped_types_1.PartialType)(create_land_registration_dto_1.CreateLandRegistrationDto) {
    status;
}
exports.UpdateLandRegistrationDto = UpdateLandRegistrationDto;
__decorate([
    (0, class_validator_1.IsEnum)(land_entity_1.LandStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLandRegistrationDto.prototype, "status", void 0);
//# sourceMappingURL=update-land-registration.dto.js.map