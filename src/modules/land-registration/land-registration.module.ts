import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Land } from './entities/land.entity';
import { LandRegistrationService } from './land-registration.service';
import { LandRegistrationController } from './land-registration.controller';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Land]),
    RabbitMQModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [LandRegistrationController],
  providers: [LandRegistrationService],
  exports: [LandRegistrationService],
})
export class LandRegistrationModule {} 