import { ClientProxy } from '@nestjs/microservices';
import { NotificationType } from '../notifications/notifications.service';
export declare enum RabbitMQEvents {
    LAND_REGISTERED = "land.registered",
    LAND_VERIFIED = "land.verified",
    LAND_UPDATED = "land.updated",
    USER_NOTIFICATION = "user.notification",
    STATUS_UPDATE = "status.update"
}
export declare class RabbitMQService {
    private readonly client;
    constructor(client: ClientProxy);
    emit(event: RabbitMQEvents, data: any): Promise<import("rxjs").Observable<any>>;
    private generateEventId;
    handleLandRegistration(landId: string, data: any): Promise<void>;
    handleLandVerification(landId: string, data: any): Promise<void>;
    handleLandUpdate(landId: string, data: any): Promise<void>;
    handleUserNotification(userId: string, type: NotificationType, data: any): Promise<void>;
    handleStatusUpdate(data: any): Promise<void>;
}
