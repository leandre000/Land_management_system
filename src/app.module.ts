import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LandRegistrationModule } from './modules/land-registration/land-registration.module';
import { LandTransferModule } from './modules/land-transfer/land-transfer.module';
import { LandTaxesModule } from './modules/land-taxes/land-taxes.module';
import { ConflictResolutionModule } from './modules/conflict-resolution/conflict-resolution.module';
import { UrbanizationModule } from './modules/urbanization/urbanization.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { DocumentGenerationModule } from './modules/document-generation/document-generation.module';
import { ReportsModule } from './modules/reports/reports.module';
import { MinioModule } from './modules/minio/minio.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    
    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),


    // Scheduling
    ScheduleModule.forRoot(),

    // Feature Modules
    UsersModule,
    AuthModule,
    LandRegistrationModule,
    LandTransferModule,
    LandTaxesModule,
    ConflictResolutionModule,
    UrbanizationModule,
    NotificationsModule,
    AuditLogsModule,
    DocumentGenerationModule,
    ReportsModule,
    MinioModule
  ],
})
export class AppModule {}
