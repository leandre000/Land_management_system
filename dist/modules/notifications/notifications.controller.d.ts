import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getUserNotifications(req: any): Promise<import("./notifications.service").Notification[]>;
    getUnreadNotifications(req: any): Promise<import("./notifications.service").Notification[]>;
    markAsRead(req: any, notificationId: string): Promise<{
        message: string;
    }>;
    markAllAsRead(req: any): Promise<{
        message: string;
    }>;
    getStatus(entityType: string, entityId: string): Promise<any>;
    subscribeToEntity(req: any, entityType: string, entityId: string): Promise<{
        message: string;
    }>;
    unsubscribeFromEntity(req: any, entityType: string, entityId: string): Promise<{
        message: string;
    }>;
}
