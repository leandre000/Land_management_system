import { NotificationsService } from '../notifications/notifications.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
export declare class EventListenerService {
    private readonly notificationsService;
    private readonly auditLogsService;
    constructor(notificationsService: NotificationsService, auditLogsService: AuditLogsService);
    handleLandRegistered(payload: any): Promise<void>;
    handleLandVerified(payload: any): Promise<void>;
    handleLandUpdated(payload: any): Promise<void>;
    handleUserNotification(payload: any): Promise<void>;
    handleStatusUpdate(payload: any): Promise<void>;
    handleGeoJsonProcessed(payload: any): Promise<void>;
    handleDocumentGenerationRequested(payload: any): Promise<void>;
    handleAuditLogCreated(payload: any): Promise<void>;
}
