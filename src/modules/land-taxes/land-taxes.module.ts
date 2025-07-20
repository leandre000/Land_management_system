import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandTaxesService } from './land-taxes.service';
import { LandTaxesController } from './land-taxes.controller';
import { TaxAssessment } from './entities/tax-assessment.entity';
import { LandRegistrationModule } from '../land-registration/land-registration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaxAssessment]),
    LandRegistrationModule,
  ],
  controllers: [LandTaxesController],
  providers: [LandTaxesService],
  exports: [LandTaxesService],
})
export class LandTaxesModule {} 