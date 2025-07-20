import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
export declare const redisConfig: (configService: ConfigService) => Promise<{
    store: typeof redisStore;
    host: any;
    port: any;
    ttl: any;
    max: any;
    url: any;
}>;
