import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum LandStatus {
  REGISTERED = 'REGISTERED',
  PENDING_TRANSFER = 'PENDING_TRANSFER',
  UNDER_DISPUTE = 'UNDER_DISPUTE',
  PENDING_CONSTRUCTION = 'PENDING_CONSTRUCTION',
}

@Entity('lands')
export class Land {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plotNumber: string;


@Column({
  type: 'geometry',
  spatialFeatureType: 'Polygon',
  srid: 4326,
})
geometry: any;

@Column('jsonb', { nullable: true })
geoJson?: object; 


  @Column({ nullable: true })
  address?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area: number;

  @Column()
  title: string;

  @Column('simple-array', { nullable: true })
  boundaries?: string[];

  @Column({ nullable: true })
  description?: string;

  @Column('jsonb', { nullable: true })
  documents?: object;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  value?: number;

  @Column({
    type: 'enum',
    enum: LandStatus,
    default: LandStatus.REGISTERED,
  })
  status: LandStatus;

  @ManyToOne(() => User, { eager: true })
  owner: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  verifiedBy?: User;

  @Column({ type: 'timestamp', nullable: true })
  verificationDate?: Date;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}