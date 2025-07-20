import { Cache } from 'cache-manager';
import { Server } from 'socket.io';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
interface ExtendedCache extends Cache {
    store: {
        keys: (pattern: string) => Promise<string[]>;
    };
}
export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    data: any;
    timestamp: Date;
    read: boolean;
}
export declare enum NotificationType {
    LAND_REGISTERED = "LAND_REGISTERED",
    LAND_VERIFIED = "LAND_VERIFIED",
    LAND_UPDATED = "LAND_UPDATED",
    TRANSFER_INITIATED = "TRANSFER_INITIATED",
    TRANSFER_PENDING_APPROVAL = "TRANSFER_PENDING_APPROVAL",
    TRANSFER_APPROVED = "TRANSFER_APPROVED",
    TRANSFER_COMPLETED = "TRANSFER_COMPLETED",
    TRANSFER_REJECTED = "TRANSFER_REJECTED",
    PERMIT_APPLIED = "PERMIT_APPLIED",
    PERMIT_APPROVED = "PERMIT_APPROVED",
    PERMIT_REJECTED = "PERMIT_REJECTED",
    DISPUTE_FILED = "DISPUTE_FILED",
    DISPUTE_RESOLVED = "DISPUTE_RESOLVED",
    DISPUTE_UPDATED = "DISPUTE_UPDATED",
    TAX_ASSESSED = "TAX_ASSESSED",
    TAX_PAID = "TAX_PAID",
    TAX_OVERDUE = "TAX_OVERDUE"
}
export declare class NotificationsService {
    private cacheManager;
    private readonly rabbitMQService;
    server: Server;
    constructor(cacheManager: ExtendedCache, rabbitMQService: RabbitMQService);
    sendNotification(userId: string, type: NotificationType, data: any): Promise<Notification>;
    getUserNotifications(userId: string): Promise<Notification[]>;
    getUnreadNotifications(userId: string): Promise<Notification[]>;
    markAsRead(userId: string, notificationId: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
    trackStatus(entityType: string, entityId: string, status: string): Promise<void>;
    getStatus(entityType: string, entityId: string): Promise<any>;
    subscribeToEntity(userId: string, entityType: string, entityId: string): Promise<void>;
    unsubscribeFromEntity(userId: string, entityType: string, entityId: string): Promise<void>;
}
export {};
