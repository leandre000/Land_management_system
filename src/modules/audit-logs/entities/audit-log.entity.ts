import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum AuditAction {
  LAND_CREATED = 'LAND_CREATED',
  LAND_UPDATED = 'LAND_UPDATED',
  LAND_VERIFIED = 'LAND_VERIFIED',
  LAND_TRANSFERRED = 'LAND_TRANSFERRED',
  DOCUMENT_GENERATED = 'DOCUMENT_GENERATED',
  TAX_ASSESSED = 'TAX_ASSESSED',
  TAX_PAID = 'TAX_PAID',
  GEOJSON_PROCESSED = 'GEOJSON_PROCESSED',
}

@Entity('audit_logs')
@Index(['entityType', 'entityId'])
@Index(['action'])
@Index(['userId'])
@Index(['createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action: AuditAction;

  @Column()
  entityType: string; // 'Land', 'TaxAssessment', etc.

  @Column()
  entityId: string;

  @Column('jsonb', { nullable: true })
  oldValues?: object;

  @Column('jsonb', { nullable: true })
  newValues?: object;

  @Column('jsonb', { nullable: true })
  metadata?: object;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  user?: User;

  @Column({ nullable: true })
  userId?: string;

  @CreateDateColumn()
  createdAt: Date;
} 