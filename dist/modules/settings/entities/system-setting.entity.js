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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSetting = exports.SettingType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
var SettingType;
(function (SettingType) {
    SettingType["TAX_RATE"] = "tax_rate";
    SettingType["PERMIT_FEE"] = "permit_fee";
    SettingType["WORKFLOW"] = "workflow";
    SettingType["NOTIFICATION"] = "notification";
    SettingType["SYSTEM"] = "system";
})(SettingType || (exports.SettingType = SettingType = {}));
let SystemSetting = class SystemSetting extends base_entity_1.BaseEntity {
    type;
    key;
    value;
    description;
    isActive;
    metadata;
};
exports.SystemSetting = SystemSetting;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SettingType,
    }),
    __metadata("design:type", String)
], SystemSetting.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SystemSetting.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], SystemSetting.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SystemSetting.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SystemSetting.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], SystemSetting.prototype, "metadata", void 0);
exports.SystemSetting = SystemSetting = __decorate([
    (0, typeorm_1.Entity)('system_settings')
], SystemSetting);
//# sourceMappingURL=system-setting.entity.js.map