"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanizationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const construction_permit_entity_1 = require("./entities/construction-permit.entity");
const urbanization_service_1 = require("./urbanization.service");
const urbanization_controller_1 = require("./urbanization.controller");
const land_registration_module_1 = require("../land-registration/land-registration.module");
const notifications_module_1 = require("../notifications/notifications.module");
const users_module_1 = require("../users/users.module");
let UrbanizationModule = class UrbanizationModule {
};
exports.UrbanizationModule = UrbanizationModule;
exports.UrbanizationModule = UrbanizationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([construction_permit_entity_1.ConstructionPermit]),
            land_registration_module_1.LandRegistrationModule,
            notifications_module_1.NotificationsModule,
            users_module_1.UsersModule,
        ],
        controllers: [urbanization_controller_1.UrbanizationController],
        providers: [urbanization_service_1.UrbanizationService],
        exports: [urbanization_service_1.UrbanizationService],
    })
], UrbanizationModule);
//# sourceMappingURL=urbanization.module.js.map