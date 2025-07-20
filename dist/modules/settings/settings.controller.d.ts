import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SystemSetting, SettingType } from './entities/system-setting.entity';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto): Promise<SystemSetting>;
    findAll(): Promise<SystemSetting[]>;
    getActiveSettings(): Promise<SystemSetting[]>;
    findByType(type: SettingType): Promise<SystemSetting[]>;
    findByKey(key: string): Promise<SystemSetting>;
    findOne(id: string): Promise<SystemSetting>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<SystemSetting>;
    bulkUpdate(settings: UpdateSettingDto[]): Promise<SystemSetting[]>;
    remove(id: string): Promise<void>;
    getSettingValue(type: SettingType, key: string): Promise<any>;
}
