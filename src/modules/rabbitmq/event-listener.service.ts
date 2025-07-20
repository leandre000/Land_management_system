import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RabbitMQEvents } from './rabbitmq.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EventListenerService {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @EventPattern(RabbitMQEvents.LAND_REGISTERED)
  async handleLandRegistered(@Payload() data: any) {
    // Handle land registration event
    await this.notificationsService.sendNotification(
      data.data.owner.id,
      'land_registered',
      {
        landId: data.data.landId,
        title: 'Land Registration Successful',
        message: `Your land with plot number ${data.data.plotNumber} has been registered successfully.`,
      }
    );
  }

  @EventPattern(RabbitMQEvents.LAND_VERIFIED)
  async handleLandVerified(@Payload() data: any) {
    // Handle land verification event
    await this.notificationsService.sendNotification(
      data.data.owner.id,
      'land_verified',
      {
        landId: data.data.landId,
        title: 'Land Verification Complete',
        message: `Your land with plot number ${data.data.plotNumber} has been verified.`,
      }
    );
  }

  @EventPattern(RabbitMQEvents.TRANSFER_INITIATED)
  async handleTransferInitiated(@Payload() data: any) {
    // Notify both parties
    await this.notificationsService.sendNotification(
      data.data.fromOwner.id,
      'transfer_initiated',
      {
        transferId: data.data.transferId,
        title: 'Transfer Initiated',
        message: `You have initiated a land transfer request.`,
      }
    );

    await this.notificationsService.sendNotification(
      data.data.toOwner.id,
      'transfer_initiated',
      {
        transferId: data.data.transferId,
        title: 'Transfer Request Received',
        message: `You have received a land transfer request.`,
      }
    );
  }

  @EventPattern(RabbitMQEvents.TAX_ASSESSED)
  async handleTaxAssessed(@Payload() data: any) {
    await this.notificationsService.sendNotification(
      data.data.owner.id,
      'tax_assessed',
      {
        taxId: data.data.taxId,
        title: 'Tax Assessment Complete',
        message: `Your land tax assessment has been completed. Amount due: ${data.data.amount}`,
      }
    );
  }

  @EventPattern(RabbitMQEvents.DISPUTE_FILED)
  async handleDisputeFiled(@Payload() data: any) {
    // Notify all parties involved
    await this.notificationsService.sendNotification(
      data.data.complainant.id,
      'dispute_filed',
      {
        disputeId: data.data.disputeId,
        title: 'Dispute Filed',
        message: `Your land dispute has been filed successfully.`,
      }
    );

    for (const respondent of data.data.respondents) {
      await this.notificationsService.sendNotification(
        respondent.id,
        'dispute_filed',
        {
          disputeId: data.data.disputeId,
          title: 'Dispute Notice',
          message: `A land dispute has been filed involving you.`,
        }
      );
    }
  }

  @EventPattern(RabbitMQEvents.PERMIT_APPLIED)
  async handlePermitApplied(@Payload() data: any) {
    await this.notificationsService.sendNotification(
      data.data.applicant.id,
      'permit_applied',
      {
        permitId: data.data.permitId,
        title: 'Construction Permit Application',
        message: `Your construction permit application has been submitted successfully.`,
      }
    );
  }

  @EventPattern(RabbitMQEvents.SYSTEM_ERROR)
  async handleSystemError(@Payload() data: any) {
    // Log error and notify system administrators
    console.error('System Error:', data.error);
    // You could implement admin notifications here
  }
} 