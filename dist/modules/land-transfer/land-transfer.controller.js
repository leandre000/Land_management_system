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
exports.LandTransferController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const land_transfer_service_1 = require("./land-transfer.service");
const create_transfer_dto_1 = require("./dto/create-transfer.dto");
const approve_transfer_dto_1 = require("./dto/approve-transfer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const land_transfer_entity_1 = require("./entities/land-transfer.entity");
let LandTransferController = class LandTransferController {
    landTransferService;
    constructor(landTransferService) {
        this.landTransferService = landTransferService;
    }
    create(createTransferDto, req) {
        return this.landTransferService.create(createTransferDto, req.user);
    }
    findAll() {
        return this.landTransferService.findAll();
    }
    findMyTransfers(req) {
        return this.landTransferService.findByUser(req.user.id);
    }
    findOne(id) {
        return this.landTransferService.findOne(id);
    }
    approve(id, approveTransferDto, req) {
        return this.landTransferService.approve(id, approveTransferDto, req.user);
    }
    cancel(id, req) {
        return this.landTransferService.cancel(id, req.user);
    }
};
exports.LandTransferController = LandTransferController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new land transfer request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Transfer request created successfully', type: land_transfer_entity_1.LandTransfer }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto, Object]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transfer requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all transfer requests', type: [land_transfer_entity_1.LandTransfer] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-transfers'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s transfer requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user\'s transfer requests', type: [land_transfer_entity_1.LandTransfer] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findMyTransfers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transfer request by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the transfer request', type: land_transfer_entity_1.LandTransfer }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject transfer request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transfer request processed successfully', type: land_transfer_entity_1.LandTransfer }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_transfer_dto_1.ApproveTransferDto, Object]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel transfer request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transfer request cancelled successfully', type: land_transfer_entity_1.LandTransfer }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "cancel", null);
exports.LandTransferController = LandTransferController = __decorate([
    (0, swagger_1.ApiTags)('land-transfer'),
    (0, common_1.Controller)('land-transfer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [land_transfer_service_1.LandTransferService])
], LandTransferController);
//# sourceMappingURL=land-transfer.controller.js.map