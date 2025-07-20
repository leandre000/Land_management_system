import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RabbitMQService, RabbitMQEvents } from '../rabbitmq/rabbitmq.service';

export enum NotificationType {
  LAND_REGISTERED = 'land_registered',
  LAND_VERIFIED = 'land_verified',
  TRANSFER_INITIATED = 'transfer_initiated',
  TRANSFER_APPROVED = 'transfer_approved',
  TAX_ASSESSED = 'tax_assessed',
  TAX_PAID = 'tax_paid',
  DISPUTE_FILED = 'dispute_filed',
  DISPUTE_RESOLVED = 'dispute_resolved',
  PERMIT_APPLIED = 'permit_applied',
  PERMIT_APPROVED = 'permit_approved',
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async sendNotification(
    userId: string,
    type: NotificationType,
    data: any,
  ) {
    const notification = {
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
      { ttl: 60 * 60 * 24 * 7 } // 7 days
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

  async getUserNotifications(userId: string): Promise<any[]> {
    const keys = await this.cacheManager.store.keys(`notification:${userId}:*`);
    const notifications = await Promise.all(
      keys.map(key => this.cacheManager.get(key))
    );
    return notifications
      .filter(n => n !== null)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async getUnreadNotifications(userId: string): Promise<any[]> {
    const notifications = await this.getUserNotifications(userId);
    return notifications.filter(n => !n.read);
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const key = `notification:${userId}:${notificationId}`;
    const notification = await this.cacheManager.get(key);
    
    if (notification) {
      notification.read = true;
      await this.cacheManager.set(key, notification);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    const notifications = await this.getUserNotifications(userId);
    await Promise.all(
      notifications.map(async (notification) => {
        notification.read = true;
        await this.cacheManager.set(
          `notification:${userId}:${notification.id}`,
          notification
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