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
const land_transfer_service_1 = require("./land-transfer.service");
const create_transfer_dto_1 = require("./dto/create-transfer.dto");
const update_transfer_dto_1 = require("./dto/update-transfer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let LandTransferController = class LandTransferController {
    landTransferService;
    constructor(landTransferService) {
        this.landTransferService = landTransferService;
    }
    create(createTransferDto) {
        return this.landTransferService.create(createTransferDto);
    }
    findAll() {
        return this.landTransferService.findAll();
    }
    findMyTransfers(req) {
        return this.landTransferService.findByOwner(req.user.id);
    }
    findOne(id) {
        return this.landTransferService.findOne(id);
    }
    update(id, updateTransferDto) {
        return this.landTransferService.update(id, updateTransferDto);
    }
    remove(id) {
        return this.landTransferService.remove(id);
    }
    approve(id) {
        return this.landTransferService.approve(id);
    }
    reject(id, reason) {
        return this.landTransferService.reject(id, reason);
    }
};
exports.LandTransferController = LandTransferController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new land transfer request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The land transfer has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all land transfers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all land transfers.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-transfers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transfers related to the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all transfers where the user is either the sender or receiver.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findMyTransfers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific land transfer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the land transfer.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a land transfer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land transfer has been successfully updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transfer_dto_1.UpdateTransferDto]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a land transfer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land transfer has been successfully deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a land transfer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land transfer has been successfully approved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a land transfer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land transfer has been successfully rejected.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LandTransferController.prototype, "reject", null);
exports.LandTransferController = LandTransferController = __decorate([
    (0, swagger_1.ApiTags)('land-transfer'),
    (0, common_1.Controller)('land-transfer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [land_transfer_service_1.LandTransferService])
], LandTransferController);
//# sourceMappingURL=land-transfer.controller.js.map