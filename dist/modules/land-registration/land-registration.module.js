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
const land_entity_1 = require("./entities/land.entity");
const land_registration_service_1 = require("./land-registration.service");
const land_registration_controller_1 = require("./land-registration.controller");
const rabbitmq_module_1 = require("../rabbitmq/rabbitmq.module");
const redis_module_1 = require("../redis/redis.module");
const users_module_1 = require("../users/users.module");
const audit_logs_module_1 = require("../audit-logs/audit-logs.module");
const document_generation_module_1 = require("../document-generation/document-generation.module");
let LandRegistrationModule = class LandRegistrationModule {
};
exports.LandRegistrationModule = LandRegistrationModule;
exports.LandRegistrationModule = LandRegistrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([land_entity_1.Land]),
            rabbitmq_module_1.RabbitMQModule,
            redis_module_1.RedisModule,
            users_module_1.UsersModule,
            audit_logs_module_1.AuditLogsModule,
            document_generation_module_1.DocumentGenerationModule,
        ],
        controllers: [land_registration_controller_1.LandRegistrationController],
        providers: [land_registration_service_1.LandRegistrationService],
        exports: [land_registration_service_1.LandRegistrationService],
    })
], LandRegistrationModule);
//# sourceMappingURL=land-registration.module.js.map