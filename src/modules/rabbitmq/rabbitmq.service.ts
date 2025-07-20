import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export enum RabbitMQEvents {
  // Land Registration Events
  LAND_REGISTERED = 'land.registered',
  LAND_VERIFIED = 'land.verified',
  LAND_UPDATED = 'land.updated',
  
  // Land Transfer Events
  TRANSFER_INITIATED = 'transfer.initiated',
  TRANSFER_APPROVED = 'transfer.approved',
  TRANSFER_REJECTED = 'transfer.rejected',
  TRANSFER_CANCELLED = 'transfer.cancelled',
  
  // Tax Events
  TAX_ASSESSED = 'tax.assessed',
  TAX_PAID = 'tax.paid',
  TAX_OVERDUE = 'tax.overdue',
  
  // Dispute Events
  DISPUTE_FILED = 'dispute.filed',
  DISPUTE_MEDIATION = 'dispute.mediation',
  DISPUTE_RESOLVED = 'dispute.resolved',
  
  // Construction Permit Events
  PERMIT_APPLIED = 'permit.applied',
  PERMIT_REVIEWED = 'permit.reviewed',
  PERMIT_APPROVED = 'permit.approved',
  PERMIT_REJECTED = 'permit.rejected',
  PERMIT_EXPIRED = 'permit.expired',
  
  // Document Events
  DOCUMENT_UPLOADED = 'document.uploaded',
  DOCUMENT_VERIFIED = 'document.verified',
  
  // User Events
  USER_REGISTERED = 'user.registered',
  USER_UPDATED = 'user.updated',
  USER_NOTIFICATION = 'user.notification',
  
  // System Events
  SYSTEM_ERROR = 'system.error',
  STATUS_UPDATE = 'status.update',
  
  // Notification Events
  EMAIL_NOTIFICATION = 'notification.email',
  SMS_NOTIFICATION = 'notification.sms',
  PUSH_NOTIFICATION = 'notification.push',
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

  async send(pattern: string, data: any) {
    return this.client.send(pattern, {
      data,
      timestamp: new Date(),
      eventId: this.generateEventId(),
    });
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Event handlers for different modules
  async handleLandRegistration(landId: string, data: any) {
    await this.emit(RabbitMQEvents.LAND_REGISTERED, {
      landId,
      ...data,
    });

    // Send notifications
    if (data.owner) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.owner.id,
        subject: 'Land Registration Successful',
        template: 'land-registration',
        data: {
          landId,
          plotNumber: data.plotNumber,
          location: data.location,
        },
      });
    }
  }

  async handleLandVerification(landId: string, data: any) {
    await this.emit(RabbitMQEvents.LAND_VERIFIED, {
      landId,
      ...data,
    });

    // Send notifications
    if (data.owner) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.owner.id,
        subject: 'Land Verification Complete',
        template: 'land-verification',
        data: {
          landId,
          plotNumber: data.plotNumber,
          verifiedBy: data.verifiedBy?.firstName + ' ' + data.verifiedBy?.lastName,
          verificationDate: data.verificationDate,
        },
      });
    }
  }

  async handleTransferInitiation(transferId: string, data: any) {
    await this.emit(RabbitMQEvents.TRANSFER_INITIATED, {
      transferId,
      ...data,
    });

    // Send notifications to both parties
    if (data.fromOwner) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.fromOwner.id,
        subject: 'Land Transfer Initiated',
        template: 'transfer-initiated-sender',
        data: {
          transferId,
          landId: data.land?.id,
          plotNumber: data.land?.plotNumber,
        },
      });
    }

    if (data.toOwner) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.toOwner.id,
        subject: 'Land Transfer Request Received',
        template: 'transfer-initiated-receiver',
        data: {
          transferId,
          landId: data.land?.id,
          plotNumber: data.land?.plotNumber,
          fromOwner: data.fromOwner?.firstName + ' ' + data.fromOwner?.lastName,
        },
      });
    }
  }

  async handleTaxAssessment(taxId: string, data: any) {
    await this.emit(RabbitMQEvents.TAX_ASSESSED, {
      taxId,
      ...data,
    });

    // Send notification to owner
    if (data.owner) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.owner.id,
        subject: 'Land Tax Assessment',
        template: 'tax-assessment',
        data: {
          taxId,
          landId: data.land?.id,
          plotNumber: data.land?.plotNumber,
          amount: data.amount,
          dueDate: data.dueDate,
        },
      });
    }
  }

  async handleDisputeFiling(disputeId: string, data: any) {
    await this.emit(RabbitMQEvents.DISPUTE_FILED, {
      disputeId,
      ...data,
    });

    // Send notifications to all parties
    if (data.complainant) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.complainant.id,
        subject: 'Land Dispute Filed',
        template: 'dispute-filed-complainant',
        data: {
          disputeId,
          landId: data.land?.id,
          plotNumber: data.land?.plotNumber,
        },
      });
    }

    if (data.respondents) {
      for (const respondent of data.respondents) {
        await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
          userId: respondent.id,
          subject: 'Land Dispute Notice',
          template: 'dispute-filed-respondent',
          data: {
            disputeId,
            landId: data.land?.id,
            plotNumber: data.land?.plotNumber,
            complainant: data.complainant?.firstName + ' ' + data.complainant?.lastName,
          },
        });
      }
    }
  }

  async handlePermitApplication(permitId: string, data: any) {
    await this.emit(RabbitMQEvents.PERMIT_APPLIED, {
      permitId,
      ...data,
    });

    // Send notification to applicant
    if (data.applicant) {
      await this.emit(RabbitMQEvents.EMAIL_NOTIFICATION, {
        userId: data.applicant.id,
        subject: 'Construction Permit Application Received',
        template: 'permit-application',
        data: {
          permitId,
          landId: data.land?.id,
          plotNumber: data.land?.plotNumber,
          constructionType: data.constructionType,
        },
      });
    }
  }

  async handleSystemError(error: any) {
    await this.emit(RabbitMQEvents.SYSTEM_ERROR, {
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code,
      },
    });
  }
} 