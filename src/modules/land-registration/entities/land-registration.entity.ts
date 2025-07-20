import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum LandStatus {
  PENDING_REGISTRATION = 'pending_registration',
  REGISTERED = 'registered',
  UNDER_DISPUTE = 'under_dispute',
  PENDING_TRANSFER = 'pending_transfer',
  PENDING_CONSTRUCTION = 'pending_construction',
}

@Entity()
export class LandRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  plotNumber: string;

  @Column('jsonb')
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  @Column('decimal')
  area: number;

  @Column('text')
  description: string;

  @Column('jsonb', { nullable: true })
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };

  @Column('text', { array: true, default: [] })
  documents: string[];

  @ManyToOne(() => User, { eager: true })
  owner: User;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => User, { nullable: true, eager: true })
  verifiedBy: User;

  @Column({ nullable: true })
  verificationDate: Date;

  @Column({
    type: 'enum',
    enum: LandStatus,
    default: LandStatus.PENDING_REGISTRATION,
  })
  status: LandStatus;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 