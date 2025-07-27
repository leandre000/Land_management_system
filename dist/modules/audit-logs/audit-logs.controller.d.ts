import { AuditLogsService } from './audit-logs.service';
import { AuditAction } from './entities/audit-log.entity';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    findAll(limit?: string, offset?: string): Promise<{
        logs: import("./entities/audit-log.entity").AuditLog[];
        total: number;
    }>;
    findRecent(hours?: string): Promise<import("./entities/audit-log.entity").AuditLog[]>;
    findByEntity(entityType: string, entityId: string): Promise<import("./entities/audit-log.entity").AuditLog[]>;
    findByUser(userId: string): Promise<import("./entities/audit-log.entity").AuditLog[]>;
    findByAction(action: AuditAction): Promise<import("./entities/audit-log.entity").AuditLog[]>;
}
