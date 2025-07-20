import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { LandStatus } from '../../../common/enums/land-status.enum';

@Entity('lands')
export class Land extends BaseEntity {
  @Column()
  title: string;

  @Column()
  plotNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  location: string;

  @Column('jsonb')
  coordinates: {
    latitude: number;
    longitude: number;
  };

  @Column('text', { array: true, nullable: true })
  boundaries: string[];

  @Column({
    type: 'enum',
    enum: LandStatus,
    default: LandStatus.PENDING_REGISTRATION
  })
  status: LandStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  documents: object;

  @ManyToOne(() => User, { eager: true })
  owner: User;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  value: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastValuationDate: Date;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => User, { nullable: true, eager: true })
  verifiedBy: User;

  @Column({ type: 'timestamp with time zone', nullable: true })
  verificationDate: Date;
} 