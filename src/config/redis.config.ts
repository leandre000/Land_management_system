import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const redisConfig = async (configService: ConfigService) => ({
  store: redisStore,
  host: configService.get('REDIS_HOST', 'localhost'),
  port: configService.get('REDIS_PORT', 6379),
  ttl: configService.get('REDIS_TTL', 60 * 60 * 24), // 24 hours
  max: configService.get('REDIS_MAX_ITEMS', 100),
  url: configService.get('REDIS_URL'),
}); 