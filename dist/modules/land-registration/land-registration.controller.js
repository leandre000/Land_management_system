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
exports.LandRegistrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const land_registration_service_1 = require("./land-registration.service");
const create_land_dto_1 = require("./dto/create-land.dto");
const update_land_dto_1 = require("./dto/update-land.dto");
const verify_land_dto_1 = require("./dto/verify-land.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const land_entity_1 = require("./entities/land.entity");
let LandRegistrationController = class LandRegistrationController {
    landRegistrationService;
    constructor(landRegistrationService) {
        this.landRegistrationService = landRegistrationService;
    }
    create(createLandDto, req) {
        return this.landRegistrationService.create(createLandDto, req.user);
    }
    findAll() {
        return this.landRegistrationService.findAll();
    }
    findMyLands(req) {
        return this.landRegistrationService.findByOwner(req.user.id);
    }
    findOne(id) {
        return this.landRegistrationService.findOne(id);
    }
    update(id, updateLandDto, req) {
        return this.landRegistrationService.update(id, updateLandDto, req.user);
    }
    verify(id, verifyLandDto, req) {
        return this.landRegistrationService.verify(id, verifyLandDto, req.user);
    }
    remove(id, req) {
        return this.landRegistrationService.remove(id, req.user);
    }
};
exports.LandRegistrationController = LandRegistrationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Register new land' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Land registered successfully', type: land_entity_1.Land }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_land_dto_1.CreateLandDto, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lands' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all lands', type: [land_entity_1.Land] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-lands'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s lands' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user\'s lands', type: [land_entity_1.Land] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findMyLands", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get land by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the land', type: land_entity_1.Land }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Update land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Land updated successfully', type: land_entity_1.Land }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_land_dto_1.UpdateLandDto, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.LAND_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Verify land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Land verified successfully', type: land_entity_1.Land }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verify_land_dto_1.VerifyLandDto, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "verify", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Land deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "remove", null);
exports.LandRegistrationController = LandRegistrationController = __decorate([
    (0, swagger_1.ApiTags)('land-registration'),
    (0, common_1.Controller)('land-registration'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [land_registration_service_1.LandRegistrationService])
], LandRegistrationController);
//# sourceMappingURL=land-registration.controller.js.map