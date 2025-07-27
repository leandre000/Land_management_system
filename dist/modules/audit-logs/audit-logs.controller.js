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
exports.AuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_logs_service_1 = require("./audit-logs.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const audit_log_entity_1 = require("./entities/audit-log.entity");
let AuditLogsController = class AuditLogsController {
    auditLogsService;
    constructor(auditLogsService) {
        this.auditLogsService = auditLogsService;
    }
    findAll(limit = '100', offset = '0') {
        return this.auditLogsService.findAll(parseInt(limit), parseInt(offset));
    }
    findRecent(hours = '24') {
        return this.auditLogsService.findRecent(parseInt(hours));
    }
    findByEntity(entityType, entityId) {
        return this.auditLogsService.findByEntity(entityType, entityId);
    }
    findByUser(userId) {
        return this.auditLogsService.findByUser(userId);
    }
    findByAction(action) {
        return this.auditLogsService.findByAction(action);
    }
};
exports.AuditLogsController = AuditLogsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all audit logs (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all audit logs with pagination.' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent audit logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return recent audit logs.' }),
    (0, swagger_1.ApiQuery)({ name: 'hours', required: false, type: Number }),
    __param(0, (0, common_1.Query)('hours')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findRecent", null);
__decorate([
    (0, common_1.Get)('entity/:entityType/:entityId'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs for a specific entity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return audit logs for the entity.' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findByEntity", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs for a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return audit logs for the user.' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('action/:action'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get audit logs for a specific action' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return audit logs for the action.' }),
    __param(0, (0, common_1.Param)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogsController.prototype, "findByAction", null);
exports.AuditLogsController = AuditLogsController = __decorate([
    (0, swagger_1.ApiTags)('audit-logs'),
    (0, common_1.Controller)('audit-logs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [audit_logs_service_1.AuditLogsService])
], AuditLogsController);
//# sourceMappingURL=audit-logs.controller.js.map