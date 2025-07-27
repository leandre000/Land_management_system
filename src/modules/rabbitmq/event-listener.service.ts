import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { RabbitMQEvents } from './rabbitmq.service';

@Injectable()
export class EventListenerService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly auditLogsService: AuditLogsService,
  ) {}

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

  @OnEvent(RabbitMQEvents.GEOJSON_PROCESSED)
  async handleGeoJsonProcessed(payload: any) {
    console.log('GeoJSON processed event received:', payload);
    
    const { landId, geoJsonData, processedData } = payload;
    
    // Log the GeoJSON processing success
    console.log(`GeoJSON processing completed for land ${landId}:`);
    console.log(`- Calculated area: ${processedData.area}m²`);
    console.log(`- Coordinate count: ${geoJsonData.geometry.coordinates[0].length}`);
  }

  @OnEvent(RabbitMQEvents.DOCUMENT_GENERATION_REQUESTED)
  async handleDocumentGenerationRequested(payload: any) {
    console.log('Document generation requested:', payload);
    
    const { landId, documentType, userId } = payload;
    
    // Send notification to the requester
    await this.notificationsService.sendNotification(
      userId,
      NotificationType.DOCUMENT_GENERATED,
      {
        landId,
        documentType: documentType.toLowerCase().replace('_', ' '),
        message: `Your ${documentType.toLowerCase().replace('_', ' ')} has been generated and is ready for download.`
      }
    );
    
    console.log(`${documentType} generated for land ${landId} by user ${userId}`);
  }

  @OnEvent(RabbitMQEvents.AUDIT_LOG_CREATED)
  async handleAuditLogCreated(payload: any) {
    console.log('Audit log created:', payload);
    
    // This event can be used for:
    // - Real-time monitoring dashboards
    // - Security alerts
    // - Compliance reporting
    // - Data analytics
    
    const { auditLogId } = payload;
    console.log(`Audit log ${auditLogId} created for tracking purposes`);
  }
} 