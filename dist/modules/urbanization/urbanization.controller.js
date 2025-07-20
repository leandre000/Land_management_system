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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrbanizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const urbanization_service_1 = require("./urbanization.service");
const create_permit_dto_1 = require("./dto/create-permit.dto");
const review_permit_dto_1 = require("./dto/review-permit.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const construction_permit_entity_1 = require("./entities/construction-permit.entity");
let UrbanizationController = class UrbanizationController {
    urbanizationService;
    constructor(urbanizationService) {
        this.urbanizationService = urbanizationService;
    }
    create(createPermitDto, req) {
        return this.urbanizationService.create(createPermitDto, req.user);
    }
    findAll() {
        return this.urbanizationService.findAll();
    }
    getPendingPermits() {
        return this.urbanizationService.getPendingPermits();
    }
    getApprovedPermits() {
        return this.urbanizationService.getApprovedPermits();
    }
    findMyPermits(req) {
        return this.urbanizationService.findByUser(req.user.id);
    }
    findOne(id) {
        return this.urbanizationService.findOne(id);
    }
    review(id, reviewPermitDto, req) {
        return this.urbanizationService.review(id, reviewPermitDto, req.user);
    }
    recordPayment(id) {
        return this.urbanizationService.recordPayment(id);
    }
    scheduleInspection(id, date) {
        return this.urbanizationService.scheduleInspection(id, date);
    }
    submitInspectionReport(id, report) {
        return this.urbanizationService.submitInspectionReport(id, report);
    }
};
exports.UrbanizationController = UrbanizationController;
__decorate([
    (0, common_1.Post)('permits'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Apply for a construction permit' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Permit application submitted successfully', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permit_dto_1.CreatePermitDto, Object]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('permits'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all construction permits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all permits', type: [construction_permit_entity_1.ConstructionPermit] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('permits/pending'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pending permits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all pending permits', type: [construction_permit_entity_1.ConstructionPermit] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "getPendingPermits", null);
__decorate([
    (0, common_1.Get)('permits/approved'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all approved permits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all approved permits', type: [construction_permit_entity_1.ConstructionPermit] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "getApprovedPermits", null);
__decorate([
    (0, common_1.Get)('permits/my-permits'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s permits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user\'s permits', type: [construction_permit_entity_1.ConstructionPermit] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findMyPermits", null);
__decorate([
    (0, common_1.Get)('permits/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get permit by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the permit', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('permits/:id/review'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Review permit application' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permit reviewed successfully', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_permit_dto_1.ReviewPermitDto, Object]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "review", null);
__decorate([
    (0, common_1.Post)('permits/:id/payment'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Record permit fee payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment recorded successfully', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "recordPayment", null);
__decorate([
    (0, common_1.Post)('permits/:id/inspection'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule permit inspection' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inspection scheduled successfully', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "scheduleInspection", null);
__decorate([
    (0, common_1.Post)('permits/:id/inspection-report'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CONSTRUCTION_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Submit inspection report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inspection report submitted successfully', type: construction_permit_entity_1.ConstructionPermit }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('report')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "submitInspectionReport", null);
exports.UrbanizationController = UrbanizationController = __decorate([
    (0, swagger_1.ApiTags)('urbanization'),
    (0, common_1.Controller)('urbanization'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [urbanization_service_1.UrbanizationService])
], UrbanizationController);
//# sourceMappingURL=urbanization.controller.js.map