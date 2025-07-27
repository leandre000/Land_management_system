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
export declare class AuditLogsService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLog>);
    createLog(dto: CreateAuditLogDto): Promise<AuditLog>;
    findByEntity(entityType: string, entityId: string): Promise<AuditLog[]>;
    findByUser(userId: string): Promise<AuditLog[]>;
    findByAction(action: AuditAction): Promise<AuditLog[]>;
    findAll(limit?: number, offset?: number): Promise<{
        logs: AuditLog[];
        total: number;
    }>;
    findRecent(hours?: number): Promise<AuditLog[]>;
}
