import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum SettingType {
  TAX_RATE = 'tax_rate',
  PERMIT_FEE = 'permit_fee',
  WORKFLOW = 'workflow',
  NOTIFICATION = 'notification',
  SYSTEM = 'system',
}

@Entity('system_settings')
export class SystemSetting extends BaseEntity {
  @Column({
    type: 'enum',
    enum: SettingType,
  })
  type: SettingType;

  @Column()
  key: string;

  @Column({ type: 'jsonb' })
  value: any;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata: object;
} 