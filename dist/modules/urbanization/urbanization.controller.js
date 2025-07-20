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
const urbanization_service_1 = require("./urbanization.service");
const create_permit_dto_1 = require("./dto/create-permit.dto");
const update_permit_dto_1 = require("./dto/update-permit.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const construction_permit_entity_1 = require("./entities/construction-permit.entity");
let UrbanizationController = class UrbanizationController {
    urbanizationService;
    constructor(urbanizationService) {
        this.urbanizationService = urbanizationService;
    }
    async create(createPermitDto) {
        return this.urbanizationService.create({
            ...createPermitDto,
        });
    }
    findAll() {
        return this.urbanizationService.findAll();
    }
    getPendingPermits() {
        return this.urbanizationService.findByStatus(construction_permit_entity_1.PermitStatus.PENDING);
    }
    getApprovedPermits() {
        return this.urbanizationService.findByStatus(construction_permit_entity_1.PermitStatus.APPROVED);
    }
    findByApplicant(req) {
        return this.urbanizationService.findByApplicant(req.user.id);
    }
    findOne(id) {
        return this.urbanizationService.findOne(id);
    }
    update(id, updatePermitDto) {
        return this.urbanizationService.update(id, updatePermitDto);
    }
    remove(id) {
        return this.urbanizationService.remove(id);
    }
    approve(id) {
        return this.urbanizationService.approve(id);
    }
    reject(id, reason) {
        return this.urbanizationService.reject(id, reason);
    }
    recordInspection(id, report) {
        return this.urbanizationService.recordInspection(id, report);
    }
    updateFeeStatus(id, paid) {
        return this.urbanizationService.updateFeeStatus(id, paid);
    }
};
exports.UrbanizationController = UrbanizationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new construction permit' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permit_dto_1.CreatePermitDto]),
    __metadata("design:returntype", Promise)
], UrbanizationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all construction permits' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending permits' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "getPendingPermits", null);
__decorate([
    (0, common_1.Get)('approved'),
    (0, swagger_1.ApiOperation)({ summary: 'Get approved permits' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "getApprovedPermits", null);
__decorate([
    (0, common_1.Get)('applicant'),
    (0, swagger_1.ApiOperation)({ summary: 'Get permits by applicant' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findByApplicant", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a construction permit by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a construction permit' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permit_dto_1.UpdatePermitDto]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a construction permit' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a construction permit' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a construction permit' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/inspection'),
    (0, swagger_1.ApiOperation)({ summary: 'Record inspection report' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('report')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "recordInspection", null);
__decorate([
    (0, common_1.Post)(':id/fees'),
    (0, swagger_1.ApiOperation)({ summary: 'Update fee payment status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('paid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], UrbanizationController.prototype, "updateFeeStatus", null);
exports.UrbanizationController = UrbanizationController = __decorate([
    (0, swagger_1.ApiTags)('Urbanization'),
    (0, common_1.Controller)('urbanization'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [urbanization_service_1.UrbanizationService])
], UrbanizationController);
//# sourceMappingURL=urbanization.controller.js.map