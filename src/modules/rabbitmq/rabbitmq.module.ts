import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { EventListenerService } from './event-listener.service';
import { NotificationsModule } from '../notifications/notifications.module';

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
  ],
  providers: [RabbitMQService, EventListenerService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {} 