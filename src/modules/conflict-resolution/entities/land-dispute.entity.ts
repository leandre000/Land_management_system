import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Land } from '../../land-registration/entities/land.entity';

export enum DisputeStatus {
  PENDING = 'pending',
  IN_MEDIATION = 'in_mediation',
  RESOLVED = 'resolved',
  ESCALATED = 'escalated',
  CLOSED = 'closed',
}

export enum DisputeType {
  BOUNDARY = 'boundary',
  OWNERSHIP = 'ownership',
  INHERITANCE = 'inheritance',
  ENCROACHMENT = 'encroachment',
  OTHER = 'other',
}

@Entity('land_disputes')
export class LandDispute extends BaseEntity {
  @ManyToOne(() => Land, { eager: true })
  land: Land;

  @ManyToOne(() => User, { eager: true })
  complainant: User;

  @ManyToMany(() => User)
  @JoinTable()
  respondents: User[];

  @Column({
    type: 'enum',
    enum: DisputeType,
  })
  type: DisputeType;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: DisputeStatus,
    default: DisputeStatus.PENDING,
  })
  status: DisputeStatus;

  @Column({ type: 'jsonb', nullable: true })
  evidence: object;

  @Column({ type: 'text', array: true, default: [] })
  witnesses: string[];

  @ManyToOne(() => User, { nullable: true, eager: true })
  mediator: User;

  @Column({ type: 'timestamp with time zone', nullable: true })
  mediationDate: Date;

  @Column({ type: 'text', nullable: true })
  resolution: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  resolutionDate: Date;

  @Column({ type: 'text', array: true, default: [] })
  comments: string[];

  @Column({ type: 'boolean', default: false })
  requiresFieldVisit: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fieldVisitDate: Date;

  @Column({ type: 'text', nullable: true })
  fieldVisitReport: string;
} 