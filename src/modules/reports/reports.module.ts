import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { Land } from '../land-registration/entities/land.entity';
import { User } from '../users/entities/user.entity';
import { TaxAssessment } from '../land-taxes/entities/tax-assessment.entity';
import { LandDispute } from '../conflict-resolution/entities/land-dispute.entity';
import { DocumentGenerationModule } from '../document-generation/document-generation.module';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report,
      Land,
      User,
      TaxAssessment,
      LandDispute,
    ]),
    DocumentGenerationModule,
    AuditLogsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {} 