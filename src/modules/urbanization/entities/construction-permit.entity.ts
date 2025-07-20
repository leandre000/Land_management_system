import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum PermitStatus {
  PENDING = 'pending',
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

@Entity()
export class ConstructionPermit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('text', { array: true, default: [] })
  documents: string[];

  @Column({
    type: 'enum',
    enum: PermitStatus,
    default: PermitStatus.PENDING,
  })
  status: PermitStatus;

  @Column({ type: 'timestamp', nullable: true })
  approvalDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt: Date;

  @Column('text', { nullable: true })
  rejectionReason: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  permitFee: number;

  @Column({ default: false })
  feesPaid: boolean;

  @Column({ default: false })
  requiresInspection: boolean;

  @Column({ type: 'timestamp', nullable: true })
  inspectionDate: Date;

  @Column('text', { nullable: true })
  inspectionReport: string;

  @Column('text', { array: true, default: [] })
  conditions: string[];

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 