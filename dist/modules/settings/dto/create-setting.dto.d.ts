import { SettingType } from '../entities/system-setting.entity';
export declare class CreateSettingDto {
    type: SettingType;
    key: string;
    value: any;
    description?: string;
    isActive?: boolean;
    metadata?: object;
}
