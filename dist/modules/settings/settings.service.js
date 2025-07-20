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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const system_setting_entity_1 = require("./entities/system-setting.entity");
let SettingsService = class SettingsService {
    settingRepository;
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async create(createSettingDto) {
        const existingSetting = await this.settingRepository.findOne({
            where: {
                type: createSettingDto.type,
                key: createSettingDto.key,
            },
        });
        if (existingSetting) {
            throw new common_1.ConflictException('Setting already exists');
        }
        const setting = this.settingRepository.create(createSettingDto);
        return this.settingRepository.save(setting);
    }
    async findAll() {
        return this.settingRepository.find();
    }
    async findOne(id) {
        const setting = await this.settingRepository.findOne({ where: { id } });
        if (!setting) {
            throw new common_1.NotFoundException(`Setting with ID "${id}" not found`);
        }
        return setting;
    }
    async findByType(type) {
        return this.settingRepository.find({
            where: { type },
            order: { key: 'ASC' },
        });
    }
    async findByKey(key) {
        const setting = await this.settingRepository.findOne({ where: { key } });
        if (!setting) {
            throw new common_1.NotFoundException(`Setting with key "${key}" not found`);
        }
        return setting;
    }
    async update(id, updateSettingDto) {
        const setting = await this.findOne(id);
        if (updateSettingDto.key && updateSettingDto.key !== setting.key) {
            const existingSetting = await this.settingRepository.findOne({
                where: {
                    type: setting.type,
                    key: updateSettingDto.key,
                },
            });
            if (existingSetting) {
                throw new common_1.ConflictException('Setting with this key already exists');
            }
        }
        Object.assign(setting, updateSettingDto);
        return this.settingRepository.save(setting);
    }
    async remove(id) {
        const result = await this.settingRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Setting with ID "${id}" not found`);
        }
    }
    async getSettingValue(type, key) {
        const setting = await this.settingRepository.findOne({
            where: {
                type,
                key,
                isActive: true,
            },
        });
        if (!setting) {
            throw new common_1.NotFoundException(`Setting with type "${type}" and key "${key}" not found`);
        }
        return setting.value;
    }
    async bulkUpdate(settings) {
        const updatedSettings = [];
        for (const setting of settings) {
            if (!setting.key) {
                throw new common_1.ConflictException('Key is required for bulk update');
            }
            const existingSetting = await this.settingRepository.findOne({
                where: { key: setting.key },
            });
            if (!existingSetting) {
                throw new common_1.NotFoundException(`Setting with key "${setting.key}" not found`);
            }
            Object.assign(existingSetting, setting);
            updatedSettings.push(await this.settingRepository.save(existingSetting));
        }
        return updatedSettings;
    }
    async getActiveSettings() {
        return this.settingRepository.find({
            where: { isActive: true },
            order: { type: 'ASC', key: 'ASC' },
        });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(system_setting_entity_1.SystemSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map