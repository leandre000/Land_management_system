import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandTransfer } from './entities/land-transfer.entity';
import { LandTransferService } from './land-transfer.service';
import { LandTransferController } from './land-transfer.controller';
import { LandRegistrationModule } from '../land-registration/land-registration.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LandTransfer]),
    LandRegistrationModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [LandTransferController],
  providers: [LandTransferService],
  exports: [LandTransferService],
})
export class LandTransferModule {} 