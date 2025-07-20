import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandRegistrationService } from './land-registration.service';
import { LandRegistrationController } from './land-registration.controller';
import { Land } from './entities/land.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Land])],
  controllers: [LandRegistrationController],
  providers: [LandRegistrationService],
  exports: [LandRegistrationService],
})
export class LandRegistrationModule {} 