import { Repository } from 'typeorm';
import { SystemSetting, SettingType } from './entities/system-setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<SystemSetting>);
    create(createSettingDto: CreateSettingDto): Promise<SystemSetting>;
    findAll(): Promise<SystemSetting[]>;
    findOne(id: string): Promise<SystemSetting>;
    findByType(type: SettingType): Promise<SystemSetting[]>;
    findByKey(key: string): Promise<SystemSetting>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<SystemSetting>;
    remove(id: string): Promise<void>;
    getSettingValue(type: SettingType, key: string): Promise<any>;
    bulkUpdate(settings: UpdateSettingDto[]): Promise<SystemSetting[]>;
    getActiveSettings(): Promise<SystemSetting[]>;
}
