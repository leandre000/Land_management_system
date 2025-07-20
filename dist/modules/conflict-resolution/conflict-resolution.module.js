"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResolutionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conflict_resolution_service_1 = require("./conflict-resolution.service");
const conflict_resolution_controller_1 = require("./conflict-resolution.controller");
const land_dispute_entity_1 = require("./entities/land-dispute.entity");
const land_registration_module_1 = require("../land-registration/land-registration.module");
const users_module_1 = require("../users/users.module");
let ConflictResolutionModule = class ConflictResolutionModule {
};
exports.ConflictResolutionModule = ConflictResolutionModule;
exports.ConflictResolutionModule = ConflictResolutionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([land_dispute_entity_1.LandDispute]),
            land_registration_module_1.LandRegistrationModule,
            users_module_1.UsersModule,
        ],
        controllers: [conflict_resolution_controller_1.ConflictResolutionController],
        providers: [conflict_resolution_service_1.ConflictResolutionService],
        exports: [conflict_resolution_service_1.ConflictResolutionService],
    })
], ConflictResolutionModule);
//# sourceMappingURL=conflict-resolution.module.js.map