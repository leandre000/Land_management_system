import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum TransferStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('land_transfers')
export class LandTransfer extends BaseEntity {
  @ManyToOne(() => Land, { eager: true })
  land: Land;

  @ManyToOne(() => User, { eager: true })
  fromOwner: User;

  @ManyToOne(() => User, { eager: true })
  toOwner: User;

  @Column({
    type: 'enum',
    enum: TransferStatus,
    default: TransferStatus.PENDING,
  })
  status: TransferStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  transferAmount: number;

  @Column({ type: 'jsonb', nullable: true })
  documents: object;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  approvedBy: User;

  @Column({ type: 'timestamp with time zone', nullable: true })
  approvalDate: Date;

  @Column({ type: 'text', nullable: true, default: '' })
  rejectionReason: string = '';
} 