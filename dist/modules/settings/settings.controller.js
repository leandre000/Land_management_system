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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const settings_service_1 = require("./settings.service");
const create_setting_dto_1 = require("./dto/create-setting.dto");
const update_setting_dto_1 = require("./dto/update-setting.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const system_setting_entity_1 = require("./entities/system-setting.entity");
let SettingsController = class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    create(createSettingDto) {
        return this.settingsService.create(createSettingDto);
    }
    findAll() {
        return this.settingsService.findAll();
    }
    getActiveSettings() {
        return this.settingsService.getActiveSettings();
    }
    findByType(type) {
        return this.settingsService.findByType(type);
    }
    findByKey(key) {
        return this.settingsService.findByKey(key);
    }
    findOne(id) {
        return this.settingsService.findOne(id);
    }
    update(id, updateSettingDto) {
        return this.settingsService.update(id, updateSettingDto);
    }
    bulkUpdate(settings) {
        return this.settingsService.bulkUpdate(settings);
    }
    remove(id) {
        return this.settingsService.remove(id);
    }
    getSettingValue(type, key) {
        return this.settingsService.getSettingValue(type, key);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new system setting' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Setting created successfully', type: system_setting_entity_1.SystemSetting }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setting_dto_1.CreateSettingDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all system settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all settings', type: [system_setting_entity_1.SystemSetting] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active settings', type: [system_setting_entity_1.SystemSetting] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "getActiveSettings", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get settings by type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return settings of specified type', type: [system_setting_entity_1.SystemSetting] }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)('key/:key'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get setting by key' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return setting with specified key', type: system_setting_entity_1.SystemSetting }),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "findByKey", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get setting by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the setting', type: system_setting_entity_1.SystemSetting }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update setting' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Setting updated successfully', type: system_setting_entity_1.SystemSetting }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_setting_dto_1.UpdateSettingDto]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('bulk-update'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Settings updated successfully', type: [system_setting_entity_1.SystemSetting] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "bulkUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete setting' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Setting deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('value/:type/:key'),
    (0, swagger_1.ApiOperation)({ summary: 'Get setting value' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the setting value' }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SettingsController.prototype, "getSettingValue", null);
exports.SettingsController = SettingsController = __decorate([
    (0, swagger_1.ApiTags)('settings'),
    (0, common_1.Controller)('settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map