import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum TaxStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  DISPUTED = 'disputed',
}

@Entity('tax_assessments')
export class TaxAssessment extends BaseEntity {
  @ManyToOne(() => Land, { eager: true })
  land: Land;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  assessedValue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  taxRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxAmount: number;

  @Column({ type: 'date' })
  assessmentDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaxStatus,
    default: TaxStatus.PENDING,
  })
  status: TaxStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  paymentDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User, { eager: true })
  assessedBy: User;

  @Column({ type: 'jsonb', nullable: true })
  paymentDetails: object;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  penaltyAmount: number;
} 