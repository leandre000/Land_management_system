"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandTaxesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const land_taxes_service_1 = require("./land-taxes.service");
const land_taxes_controller_1 = require("./land-taxes.controller");
const tax_assessment_entity_1 = require("./entities/tax-assessment.entity");
const land_registration_module_1 = require("../land-registration/land-registration.module");
let LandTaxesModule = class LandTaxesModule {
};
exports.LandTaxesModule = LandTaxesModule;
exports.LandTaxesModule = LandTaxesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tax_assessment_entity_1.TaxAssessment]),
            land_registration_module_1.LandRegistrationModule,
        ],
        controllers: [land_taxes_controller_1.LandTaxesController],
        providers: [land_taxes_service_1.LandTaxesService],
        exports: [land_taxes_service_1.LandTaxesService],
    })
], LandTaxesModule);
//# sourceMappingURL=land-taxes.module.js.map