import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationType } from '../notifications/notifications.service';

export enum RabbitMQEvents {
  LAND_REGISTERED = 'land.registered',
  LAND_VERIFIED = 'land.verified',
  LAND_UPDATED = 'land.updated',
  USER_NOTIFICATION = 'user.notification',
  STATUS_UPDATE = 'status.update',
  GEOJSON_PROCESSED = 'geojson.processed',
  DOCUMENT_GENERATION_REQUESTED = 'document.generation.requested',
  AUDIT_LOG_CREATED = 'audit.log.created',
}

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('LAND_MANAGEMENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async emit(event: RabbitMQEvents, data: any) {
    return this.client.emit(event, {
      data,
      timestamp: new Date(),
      eventId: this.generateEventId(),
    });
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async handleLandRegistration(landId: string, data: any) {
    await this.emit(RabbitMQEvents.LAND_REGISTERED, {
      landId,
      ...data,
    });
  }

  async handleLandVerification(landId: string, data: any) {
    await this.emit(RabbitMQEvents.LAND_VERIFIED, {
      landId,
      ...data,
    });
  }

  async handleLandUpdate(landId: string, data: any) {
    await this.emit(RabbitMQEvents.LAND_UPDATED, {
      landId,
      ...data,
    });
  }

  async handleUserNotification(userId: string, type: NotificationType, data: any) {
    await this.emit(RabbitMQEvents.USER_NOTIFICATION, {
      userId,
      type,
      ...data,
    });
  }

  async handleStatusUpdate(data: any) {
    await this.emit(RabbitMQEvents.STATUS_UPDATE, data);
  }

  async handleGeoJsonProcessed(landId: string, geoJsonData: any, processedData: any) {
    await this.emit(RabbitMQEvents.GEOJSON_PROCESSED, {
      landId,
      geoJsonData,
      processedData,
    });
  }

  async handleDocumentGenerationRequest(landId: string, documentType: string, userId: string) {
    await this.emit(RabbitMQEvents.DOCUMENT_GENERATION_REQUESTED, {
      landId,
      documentType,
      userId,
      requestedAt: new Date(),
    });
  }

  async handleAuditLogCreated(auditLogId: string, data: any) {
    await this.emit(RabbitMQEvents.AUDIT_LOG_CREATED, {
      auditLogId,
      ...data,
    });
  }
} 