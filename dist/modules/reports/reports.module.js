"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reports_service_1 = require("./reports.service");
const reports_controller_1 = require("./reports.controller");
const report_entity_1 = require("./entities/report.entity");
const land_entity_1 = require("../land-registration/entities/land.entity");
const user_entity_1 = require("../users/entities/user.entity");
const tax_assessment_entity_1 = require("../land-taxes/entities/tax-assessment.entity");
const land_dispute_entity_1 = require("../conflict-resolution/entities/land-dispute.entity");
const document_generation_module_1 = require("../document-generation/document-generation.module");
const audit_logs_module_1 = require("../audit-logs/audit-logs.module");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                report_entity_1.Report,
                land_entity_1.Land,
                user_entity_1.User,
                tax_assessment_entity_1.TaxAssessment,
                land_dispute_entity_1.LandDispute,
            ]),
            document_generation_module_1.DocumentGenerationModule,
            audit_logs_module_1.AuditLogsModule,
        ],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_service_1.ReportsService],
        exports: [reports_service_1.ReportsService],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map