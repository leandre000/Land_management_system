"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const redisStore = require("cache-manager-redis-store");
const redisConfig = (configService) => ({
    store: redisStore,
    host: configService.get('redis.host'),
    port: configService.get('redis.port'),
    ttl: 60 * 60 * 24,
});
exports.redisConfig = redisConfig;
//# sourceMappingURL=redis.config.js.map