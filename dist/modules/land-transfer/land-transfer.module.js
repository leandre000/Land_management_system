"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandTransferModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const land_transfer_service_1 = require("./land-transfer.service");
const land_transfer_controller_1 = require("./land-transfer.controller");
const land_transfer_entity_1 = require("./entities/land-transfer.entity");
const land_registration_module_1 = require("../land-registration/land-registration.module");
const users_module_1 = require("../users/users.module");
let LandTransferModule = class LandTransferModule {
};
exports.LandTransferModule = LandTransferModule;
exports.LandTransferModule = LandTransferModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([land_transfer_entity_1.LandTransfer]),
            land_registration_module_1.LandRegistrationModule,
            users_module_1.UsersModule,
        ],
        controllers: [land_transfer_controller_1.LandTransferController],
        providers: [land_transfer_service_1.LandTransferService],
        exports: [land_transfer_service_1.LandTransferService],
    })
], LandTransferModule);
//# sourceMappingURL=land-transfer.module.js.map