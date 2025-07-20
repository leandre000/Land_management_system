import { CacheModuleOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const redisConfig = (configService: ConfigService): CacheModuleOptions => ({
  store: redisStore,
  host: configService.get('redis.host'),
  port: configService.get('redis.port'),
  ttl: 60 * 60 * 24, // 24 hours
}); 