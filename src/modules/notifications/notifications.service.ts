import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RabbitMQService, RabbitMQEvents } from '../rabbitmq/rabbitmq.service';

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

export enum NotificationType {
  // Land Registration
  LAND_REGISTERED = 'LAND_REGISTERED',
  LAND_VERIFIED = 'LAND_VERIFIED',
  LAND_UPDATED = 'LAND_UPDATED',

  // Land Transfer
  TRANSFER_INITIATED = 'TRANSFER_INITIATED',
  TRANSFER_PENDING_APPROVAL = 'TRANSFER_PENDING_APPROVAL',
  TRANSFER_APPROVED = 'TRANSFER_APPROVED',
  TRANSFER_COMPLETED = 'TRANSFER_COMPLETED',
  TRANSFER_REJECTED = 'TRANSFER_REJECTED',

  // Construction Permits
  PERMIT_APPLIED = 'PERMIT_APPLIED',
  PERMIT_APPROVED = 'PERMIT_APPROVED',
  PERMIT_REJECTED = 'PERMIT_REJECTED',

  // Land Disputes
  DISPUTE_FILED = 'DISPUTE_FILED',
  DISPUTE_RESOLVED = 'DISPUTE_RESOLVED',
  DISPUTE_UPDATED = 'DISPUTE_UPDATED',

  // Tax Related
  TAX_ASSESSED = 'TAX_ASSESSED',
  TAX_PAID = 'TAX_PAID',
  TAX_OVERDUE = 'TAX_OVERDUE',
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsService {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: ExtendedCache,
    @Inject(forwardRef(() => RabbitMQService))
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async sendNotification(
    userId: string,
    type: NotificationType,
    data: any,
  ): Promise<Notification> {
    const notification: Notification = {
      id: Date.now().toString(),
      userId,
      type,
      data,
      timestamp: new Date(),
      read: false
    };

    // Store in Redis for persistence
    await this.cacheManager.set(
      `notification:${userId}:${notification.id}`,
      notification,
      604800 // 7 days
    );

    // Send real-time notification via WebSocket
    this.server.to(userId).emit('notification', notification);

    // Emit notification event to RabbitMQ for processing
    await this.rabbitMQService.emit(RabbitMQEvents.USER_NOTIFICATION, {
      ...notification,
      channels: ['email', 'sms']
    });

    return notification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    const keys = await this.cacheManager.store.keys(`notification:${userId}:*`);
    const notifications = await Promise.all(
      keys.map(key => this.cacheManager.get(key))
    );
    return notifications
      .filter((n): n is Notification => n !== null)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    const notifications = await this.getUserNotifications(userId);
    return notifications.filter(n => !n.read);
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const key = `notification:${userId}:${notificationId}`;
    const notification = await this.cacheManager.get<Notification>(key);
    
    if (notification) {
      notification.read = true;
      await this.cacheManager.set(key, notification, 604800); // 7 days
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.getUserNotifications(userId);
    await Promise.all(
      notifications.map(async (notification) => {
        notification.read = true;
        await this.cacheManager.set(
          `notification:${userId}:${notification.id}`,
          notification,
          604800 // 7 days
        );
      })
    );
  }

  // Real-time status tracking
  async trackStatus(entityType: string, entityId: string, status: string): Promise<void> {
    const statusUpdate = {
      status,
      entityType,
      entityId,
      updatedAt: new Date()
    };

    // Store status in Redis
    const key = `status:${entityType}:${entityId}`;
    await this.cacheManager.set(key, statusUpdate);

    // Emit status update via WebSocket
    this.server.to(`${entityType}:${entityId}`).emit('statusUpdate', statusUpdate);

    // Emit status update event to RabbitMQ
    await this.rabbitMQService.emit(RabbitMQEvents.STATUS_UPDATE, statusUpdate);
  }

  async getStatus(entityType: string, entityId: string): Promise<any> {
    const key = `status:${entityType}:${entityId}`;
    return this.cacheManager.get(key);
  }

  // WebSocket room management
  async subscribeToEntity(userId: string, entityType: string, entityId: string): Promise<void> {
    const socket = this.server.sockets.sockets.get(userId);
    if (socket) {
      await socket.join(`${entityType}:${entityId}`);
    }
  }

  async unsubscribeFromEntity(userId: string, entityType: string, entityId: string): Promise<void> {
    const socket = this.server.sockets.sockets.get(userId);
    if (socket) {
      await socket.leave(`${entityType}:${entityId}`);
    }
  }
} 