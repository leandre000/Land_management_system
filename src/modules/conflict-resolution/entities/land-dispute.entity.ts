import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum DisputeStatus {
  PENDING = 'pending',
  IN_MEDIATION = 'in_mediation',
  RESOLVED = 'resolved',
  CANCELLED = 'cancelled',
}

export enum DisputeType {
  BOUNDARY = 'boundary',
  OWNERSHIP = 'ownership',
  INHERITANCE = 'inheritance',
  ENCROACHMENT = 'encroachment',
  OTHER = 'other',
}

@Entity()
export class LandDispute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Land, { eager: true })
  land: Land;

  @ManyToOne(() => User, { eager: true })
  complainant: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  mediator: User;

  @Column('simple-array')
  respondents: User[];

  @Column({
    type: 'enum',
    enum: DisputeType,
  })
  type: DisputeType;

  @Column('text')
  description: string;

  @Column('text', { array: true, default: [] })
  evidence: string[];

  @Column({
    type: 'enum',
    enum: DisputeStatus,
    default: DisputeStatus.PENDING,
  })
  status: DisputeStatus;

  @Column('text', { nullable: true })
  resolution: string;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @Column('text', { array: true, default: [] })
  comments: string[];

  @Column({ default: false })
  requiresFieldVisit: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fieldVisitDate: Date;

  @Column('text', { nullable: true })
  fieldVisitReport: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 