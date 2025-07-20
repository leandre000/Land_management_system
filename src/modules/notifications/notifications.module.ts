import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from '../../config/redis.config';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: redisConfig,
      inject: [ConfigService],
    }),
    forwardRef(() => RabbitMQModule),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, RedisService],
  exports: [NotificationsService],
})
export class NotificationsModule {} 