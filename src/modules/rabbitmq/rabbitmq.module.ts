import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { EventListenerService } from './event-listener.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LAND_MANAGEMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'land_management_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    NotificationsModule,
    forwardRef(() => AuditLogsModule),
  ],
  providers: [RabbitMQService, EventListenerService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {} 