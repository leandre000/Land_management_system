import { CacheModuleOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare const redisConfig: (configService: ConfigService) => CacheModuleOptions;
