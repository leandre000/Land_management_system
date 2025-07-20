import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandTransferService } from './land-transfer.service';
import { LandTransferController } from './land-transfer.controller';
import { LandTransfer } from './entities/land-transfer.entity';
import { LandRegistrationModule } from '../land-registration/land-registration.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LandTransfer]),
    LandRegistrationModule,
    UsersModule,
  ],
  controllers: [LandTransferController],
  providers: [LandTransferService],
  exports: [LandTransferService],
})
export class LandTransferModule {} 