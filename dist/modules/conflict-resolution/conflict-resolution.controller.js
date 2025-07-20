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
const conflict_resolution_service_1 = require("./conflict-resolution.service");
const create_dispute_dto_1 = require("./dto/create-dispute.dto");
const update_dispute_dto_1 = require("./dto/update-dispute.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const land_dispute_entity_1 = require("./entities/land-dispute.entity");
let ConflictResolutionController = class ConflictResolutionController {
    conflictResolutionService;
    constructor(conflictResolutionService) {
        this.conflictResolutionService = conflictResolutionService;
    }
    async create(createDisputeDto) {
        return this.conflictResolutionService.create({
            ...createDisputeDto,
        });
    }
    findAll() {
        return this.conflictResolutionService.findAll();
    }
    getActiveDisputes() {
        return this.conflictResolutionService.findByStatus(land_dispute_entity_1.DisputeStatus.PENDING);
    }
    getResolvedDisputes() {
        return this.conflictResolutionService.findByStatus(land_dispute_entity_1.DisputeStatus.RESOLVED);
    }
    findByParticipant(req) {
        return this.conflictResolutionService.findByParticipant(req.user.id);
    }
    findOne(id) {
        return this.conflictResolutionService.findOne(id);
    }
    update(id, updateDisputeDto) {
        return this.conflictResolutionService.update(id, updateDisputeDto);
    }
    remove(id) {
        return this.conflictResolutionService.remove(id);
    }
    resolve(id, resolution) {
        return this.conflictResolutionService.resolve(id, resolution);
    }
    addComment(id, comment) {
        return this.conflictResolutionService.addComment(id, comment);
    }
    recordFieldVisit(id, report) {
        return this.conflictResolutionService.recordFieldVisit(id, report);
    }
};
exports.ConflictResolutionController = ConflictResolutionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new land dispute' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dispute_dto_1.CreateDisputeDto]),
    __metadata("design:returntype", Promise)
], ConflictResolutionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all land disputes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active disputes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "getActiveDisputes", null);
__decorate([
    (0, common_1.Get)('resolved'),
    (0, swagger_1.ApiOperation)({ summary: 'Get resolved disputes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "getResolvedDisputes", null);
__decorate([
    (0, common_1.Get)('participant'),
    (0, swagger_1.ApiOperation)({ summary: 'Get disputes by participant' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findByParticipant", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a land dispute by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a land dispute' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dispute_dto_1.UpdateDisputeDto]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a land dispute' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve a land dispute' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('resolution')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "resolve", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a dispute' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)(':id/field-visit'),
    (0, swagger_1.ApiOperation)({ summary: 'Record field visit report' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('report')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ConflictResolutionController.prototype, "recordFieldVisit", null);
exports.ConflictResolutionController = ConflictResolutionController = __decorate([
    (0, swagger_1.ApiTags)('Conflict Resolution'),
    (0, common_1.Controller)('conflict-resolution'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [conflict_resolution_service_1.ConflictResolutionService])
], ConflictResolutionController);
//# sourceMappingURL=conflict-resolution.controller.js.map