import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';
import { RabbitMQEvents } from './rabbitmq.service';

@Injectable()
export class EventListenerService {
  constructor(private readonly notificationsService: NotificationsService) {}

  @OnEvent(RabbitMQEvents.LAND_REGISTERED)
  async handleLandRegistered(payload: any) {
    if (payload.data.owner) {
      await this.notificationsService.sendNotification(
        payload.data.owner.id,
        NotificationType.LAND_REGISTERED,
        {
          landId: payload.data.id,
          plotNumber: payload.data.plotNumber,
          location: payload.data.location,
        }
      );
    }
  }

  @OnEvent(RabbitMQEvents.LAND_VERIFIED)
  async handleLandVerified(payload: any) {
    if (payload.data.owner) {
      await this.notificationsService.sendNotification(
        payload.data.owner.id,
        NotificationType.LAND_VERIFIED,
        {
          landId: payload.data.id,
          plotNumber: payload.data.plotNumber,
          verifiedBy: payload.data.verifiedBy?.fullName,
          verificationDate: payload.data.verificationDate,
        }
      );
    }
  }

  @OnEvent(RabbitMQEvents.LAND_UPDATED)
  async handleLandUpdated(payload: any) {
    if (payload.data.owner) {
      await this.notificationsService.sendNotification(
        payload.data.owner.id,
        NotificationType.LAND_UPDATED,
        {
          landId: payload.data.id,
          plotNumber: payload.data.plotNumber,
          changes: payload.data.changes,
        }
      );
    }
  }

  @OnEvent(RabbitMQEvents.USER_NOTIFICATION)
  async handleUserNotification(payload: any) {
    await this.notificationsService.sendNotification(
      payload.userId,
      payload.type,
      payload.data
    );
  }

  @OnEvent(RabbitMQEvents.STATUS_UPDATE)
  async handleStatusUpdate(payload: any) {
    if (payload.userId) {
      await this.notificationsService.sendNotification(
        payload.userId,
        payload.type,
        payload.data
      );
    }
  }
} 