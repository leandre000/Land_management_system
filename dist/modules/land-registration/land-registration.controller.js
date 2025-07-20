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
const land_registration_service_1 = require("./land-registration.service");
const create_land_dto_1 = require("./dto/create-land.dto");
const update_land_dto_1 = require("./dto/update-land.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let LandRegistrationController = class LandRegistrationController {
    landRegistrationService;
    constructor(landRegistrationService) {
        this.landRegistrationService = landRegistrationService;
    }
    create(createLandDto, req) {
        return this.landRegistrationService.create({
            ...createLandDto,
            ownerId: req.user.id,
        });
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
    update(id, updateLandDto) {
        return this.landRegistrationService.update(id, updateLandDto);
    }
    remove(id) {
        return this.landRegistrationService.remove(id);
    }
    verify(id, req) {
        return this.landRegistrationService.verify(id, req.user.id);
    }
};
exports.LandRegistrationController = LandRegistrationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new land' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The land has been successfully registered.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_land_dto_1.CreateLandDto, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all registered lands' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all registered lands.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-lands'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lands owned by the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all lands owned by the current user.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findMyLands", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the land.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land has been successfully updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_land_dto_1.UpdateLandDto]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land has been successfully deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a land' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The land has been successfully verified.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LandRegistrationController.prototype, "verify", null);
exports.LandRegistrationController = LandRegistrationController = __decorate([
    (0, swagger_1.ApiTags)('land-registration'),
    (0, common_1.Controller)('land-registration'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [land_registration_service_1.LandRegistrationService])
], LandRegistrationController);
//# sourceMappingURL=land-registration.controller.js.map