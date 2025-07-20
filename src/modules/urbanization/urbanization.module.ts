import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrbanizationService } from './urbanization.service';
import { UrbanizationController } from './urbanization.controller';
import { ConstructionPermit } from './entities/construction-permit.entity';
import { LandRegistrationModule } from '../land-registration/land-registration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConstructionPermit]),
    LandRegistrationModule,
  ],
  controllers: [UrbanizationController],
  providers: [UrbanizationService],
  exports: [UrbanizationService],
})
export class UrbanizationModule {} 