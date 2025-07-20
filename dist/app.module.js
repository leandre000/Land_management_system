"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("./config/configuration");
const schedule_1 = require("@nestjs/schedule");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const land_registration_module_1 = require("./modules/land-registration/land-registration.module");
const land_transfer_module_1 = require("./modules/land-transfer/land-transfer.module");
const land_taxes_module_1 = require("./modules/land-taxes/land-taxes.module");
const conflict_resolution_module_1 = require("./modules/conflict-resolution/conflict-resolution.module");
const urbanization_module_1 = require("./modules/urbanization/urbanization.module");
const settings_module_1 = require("./modules/settings/settings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
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
                inject: [config_1.ConfigService],
            }),
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            land_registration_module_1.LandRegistrationModule,
            land_transfer_module_1.LandTransferModule,
            land_taxes_module_1.LandTaxesModule,
            conflict_resolution_module_1.ConflictResolutionModule,
            urbanization_module_1.UrbanizationModule,
            settings_module_1.SettingsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map