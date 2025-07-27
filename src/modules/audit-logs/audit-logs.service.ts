import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog, AuditAction } from './entities/audit-log.entity';
import { User } from '../users/entities/user.entity';

export interface CreateAuditLogDto {
  action: AuditAction;
  entityType: string;
  entityId: string;
  oldValues?: object;
  newValues?: object;
  metadata?: object;
  description?: string;
  user?: User;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async createLog(dto: CreateAuditLogDto): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      ...dto,
      createdAt: new Date(),
    });

    return this.auditLogRepository.save(auditLog);
  }

  async findByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      where: { entityType, entityId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByAction(action: AuditAction): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      where: { action },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(
    limit: number = 100,
    offset: number = 0,
  ): Promise<{ logs: AuditLog[]; total: number }> {
    const [logs, total] = await this.auditLogRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return { logs, total };
  }

  async findRecent(hours: number = 24): Promise<AuditLog[]> {
    const since = new Date();
    since.setHours(since.getHours() - hours);

    return this.auditLogRepository.find({
      where: {
        createdAt: since,
      },
      order: { createdAt: 'DESC' },
    });
  }
} 