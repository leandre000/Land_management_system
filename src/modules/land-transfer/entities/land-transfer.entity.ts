import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum TransferStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('land_transfers')
export class LandTransfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Land, { eager: true })
  @JoinColumn()
  land: Land;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  fromOwner: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  toOwner: User;

  @Column({
    type: 'enum',
    enum: TransferStatus,
    default: TransferStatus.PENDING,
  })
  status: TransferStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  transferAmount: number;

  @Column({ type: 'simple-array', nullable: true })
  documents: string[];

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ type: 'timestamp', nullable: true })
  approvalDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 