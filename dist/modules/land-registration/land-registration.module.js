"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandRegistrationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const land_registration_service_1 = require("./land-registration.service");
const land_registration_controller_1 = require("./land-registration.controller");
const land_entity_1 = require("./entities/land.entity");
let LandRegistrationModule = class LandRegistrationModule {
};
exports.LandRegistrationModule = LandRegistrationModule;
exports.LandRegistrationModule = LandRegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([land_entity_1.Land])],
        controllers: [land_registration_controller_1.LandRegistrationController],
        providers: [land_registration_service_1.LandRegistrationService],
        exports: [land_registration_service_1.LandRegistrationService],
    })
], LandRegistrationModule);
//# sourceMappingURL=land-registration.module.js.map