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
exports.ConflictResolutionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conflict_resolution_service_1 = require("./conflict-resolution.service");
const create_dispute_dto_1 = require("./dto/create-dispute.dto");
const update_dispute_dto_1 = require("./dto/update-dispute.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const land_dispute_entity_1 = require("./entities/land-dispute.entity");
let ConflictResolutionController = class ConflictResolutionController {
    conflictResolutionService;
    constructor(conflictResolutionService) {
        this.conflictResolutionService = conflictResolutionService;
    }
    create(createDisputeDto, req) {
        return this.conflictResolutionService.create(createDisputeDto, req.user);
    }
    findAll() {
        return this.conflictResolutionService.findAll();
    }
    getActiveDisputes() {
        return this.conflictResolutionService.getActiveDisputes();
    }
    getResolvedDisputes() {
        return this.conflictResolutionService.getResolvedDisputes();
    }
    findMyDisputes(req) {
        return this.conflictResolutionService.findByUser(req.user.id);
    }
    findOne(id) {
        return this.conflictResolutionService.findOne(id);
    }
    update(id, updateDisputeDto) {
        return this.conflictResolutionService.update(id, updateDisputeDto);
    }
    addComment(id, comment) {
        return this.conflictResolutionService.addComment(id, comment);
    }
    scheduleFieldVisit(id, date) {
        return this.conflictResolutionService.scheduleFieldVisit(id, date);
    }
    submitFieldVisitReport(id, report) {
        return this.conflictResolutionService.submitFieldVisitReport(id, report);
    }
};
exports.ConflictResolutionController = ConflictResolutionController;
__decorate([
    (0, common_1.Post)('disputes'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new land dispute' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Dispute created successfully', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dispute_dto_1.CreateDisputeDto, Object]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('disputes'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all disputes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all disputes', type: [land_dispute_entity_1.LandDispute] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('disputes/active'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active disputes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active disputes', type: [land_dispute_entity_1.LandDispute] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "getActiveDisputes", null);
__decorate([
    (0, common_1.Get)('disputes/resolved'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all resolved disputes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all resolved disputes', type: [land_dispute_entity_1.LandDispute] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "getResolvedDisputes", null);
__decorate([
    (0, common_1.Get)('disputes/my-disputes'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s disputes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user\'s disputes', type: [land_dispute_entity_1.LandDispute] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findMyDisputes", null);
__decorate([
    (0, common_1.Get)('disputes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dispute by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the dispute', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('disputes/:id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Update dispute' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dispute updated successfully', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dispute_dto_1.UpdateDisputeDto]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('disputes/:id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add comment to dispute' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment added successfully', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('disputes/:id/field-visit'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule field visit' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Field visit scheduled successfully', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "scheduleFieldVisit", null);
__decorate([
    (0, common_1.Post)('disputes/:id/field-visit-report'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Submit field visit report' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Field visit report submitted successfully', type: land_dispute_entity_1.LandDispute }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('report')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "submitFieldVisitReport", null);
exports.ConflictResolutionController = ConflictResolutionController = __decorate([
    (0, swagger_1.ApiTags)('conflict-resolution'),
    (0, common_1.Controller)('conflict-resolution'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [conflict_resolution_service_1.ConflictResolutionService])
], ConflictResolutionController);
//# sourceMappingURL=conflict-resolution.controller.js.map