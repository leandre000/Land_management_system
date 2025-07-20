import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum PermitStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum ConstructionType {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  MIXED_USE = 'mixed_use',
  OTHER = 'other',
}

@Entity('construction_permits')
export class ConstructionPermit extends BaseEntity {
  @ManyToOne(() => Land, { eager: true })
  land: Land;

  @ManyToOne(() => User, { eager: true })
  applicant: User;

  @Column({
    type: 'enum',
    enum: ConstructionType,
  })
  constructionType: ConstructionType;

  @Column('text')
  projectDescription: string;

  @Column('decimal', { precision: 10, scale: 2 })
  estimatedCost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalArea: number;

  @Column('int')
  floors: number;

  @Column({
    type: 'enum',
    enum: PermitStatus,
    default: PermitStatus.PENDING,
  })
  status: PermitStatus;

  @Column({ type: 'jsonb', nullable: true })
  architecturalPlans: object;

  @Column({ type: 'jsonb', nullable: true })
  structuralPlans: object;

  @Column({ type: 'date' })
  proposedStartDate: Date;

  @Column({ type: 'date' })
  proposedEndDate: Date;

  @Column({ type: 'date', nullable: true })
  approvalDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  reviewedBy: User;

  @Column({ type: 'text', nullable: true })
  reviewComments: string;

  @Column({ type: 'text', array: true, default: [] })
  conditions: string[];

  @Column({ type: 'boolean', default: false })
  requiresInspection: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  inspectionDate: Date;

  @Column({ type: 'text', nullable: true })
  inspectionReport: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  permitFee: number;

  @Column({ type: 'boolean', default: false })
  feesPaid: boolean;
} 