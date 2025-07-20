import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflictResolutionService } from './conflict-resolution.service';
import { ConflictResolutionController } from './conflict-resolution.controller';
import { LandDispute } from './entities/land-dispute.entity';
import { LandRegistrationModule } from '../land-registration/land-registration.module';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LandDispute]),
    LandRegistrationModule,
    UsersModule,
    NotificationsModule
  ],
  controllers: [ConflictResolutionController],
  providers: [ConflictResolutionService],
  exports: [ConflictResolutionService],
})
export class ConflictResolutionModule {} 