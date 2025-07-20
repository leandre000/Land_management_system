"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const redisConfig = async (configService) => ({
    store: cache_manager_redis_store_1.redisStore,
    host: configService.get('REDIS_HOST', 'localhost'),
    port: configService.get('REDIS_PORT', 6379),
    ttl: configService.get('REDIS_TTL', 60 * 60 * 24),
    max: configService.get('REDIS_MAX_ITEMS', 100),
    url: configService.get('REDIS_URL'),
});
exports.redisConfig = redisConfig;
//# sourceMappingURL=redis.config.js.map