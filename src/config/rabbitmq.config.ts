import { ConfigService } from '@nestjs/config';

export const rabbitmqConfig = (configService: ConfigService) => ({
  transport: 5, // Transport.RMQ
  options: {
    urls: [configService.get('rabbitmq.url')],
    queue: 'land_management_queue',
    queueOptions: {
      durable: true,
    },
  },
}); 