import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionPermit } from './entities/construction-permit.entity';
import { UrbanizationService } from './urbanization.service';
import { UrbanizationController } from './urbanization.controller';
import { LandRegistrationModule } from '../land-registration/land-registration.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConstructionPermit]),
    LandRegistrationModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [UrbanizationController],
  providers: [UrbanizationService],
  exports: [UrbanizationService],
})
export class UrbanizationModule {} 