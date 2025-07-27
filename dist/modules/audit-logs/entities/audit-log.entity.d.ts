import { User } from '../../users/entities/user.entity';
export declare enum AuditAction {
    LAND_CREATED = "LAND_CREATED",
    LAND_UPDATED = "LAND_UPDATED",
    LAND_VERIFIED = "LAND_VERIFIED",
    LAND_TRANSFERRED = "LAND_TRANSFERRED",
    DOCUMENT_GENERATED = "DOCUMENT_GENERATED",
    TAX_ASSESSED = "TAX_ASSESSED",
    TAX_PAID = "TAX_PAID",
    GEOJSON_PROCESSED = "GEOJSON_PROCESSED"
}
export declare class AuditLog {
    id: string;
    action: AuditAction;
    entityType: string;
    entityId: string;
    oldValues?: object;
    newValues?: object;
    metadata?: object;
    description?: string;
    ipAddress?: string;
    userAgent?: string;
    user?: User;
    userId?: string;
    createdAt: Date;
}
