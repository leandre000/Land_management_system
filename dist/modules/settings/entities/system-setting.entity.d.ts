import { BaseEntity } from '../../../common/entities/base.entity';
export declare enum SettingType {
    TAX_RATE = "tax_rate",
    PERMIT_FEE = "permit_fee",
    WORKFLOW = "workflow",
    NOTIFICATION = "notification",
    SYSTEM = "system"
}
export declare class SystemSetting extends BaseEntity {
    type: SettingType;
    key: string;
    value: any;
    description: string;
    isActive: boolean;
    metadata: object;
}
