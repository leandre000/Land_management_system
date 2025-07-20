import { NotificationsService } from '../notifications/notifications.service';
export declare class EventListenerService {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    handleLandRegistered(payload: any): Promise<void>;
    handleLandVerified(payload: any): Promise<void>;
    handleLandUpdated(payload: any): Promise<void>;
    handleUserNotification(payload: any): Promise<void>;
    handleStatusUpdate(payload: any): Promise<void>;
}
