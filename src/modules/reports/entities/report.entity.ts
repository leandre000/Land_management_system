import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum ReportType {
  WEEKLY_SUMMARY = 'WEEKLY_SUMMARY',
  MONTHLY_SUMMARY = 'MONTHLY_SUMMARY',
  GEO_ANALYTICS = 'GEO_ANALYTICS',
  TAX_SUMMARY = 'TAX_SUMMARY',
}

export enum ReportStatus {
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ReportType,
  })
  type: ReportType;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.GENERATING,
  })
  status: ReportStatus;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('jsonb', { nullable: true })
  data?: object;

  @Column({ nullable: true })
  filePath?: string;

  @Column('int', { nullable: true })
  fileSize?: number;

  @Column({ type: 'date' })
  reportPeriodStart: Date;

  @Column({ type: 'date' })
  reportPeriodEnd: Date;

  @CreateDateColumn()
  createdAt: Date;
} 