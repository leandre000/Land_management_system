import { Cache } from 'cache-manager';
interface ExtendedCache extends Cache {
    store: {
        keys: (pattern: string) => Promise<string[]>;
    };
}
export declare class RedisService {
    private cacheManager;
    constructor(cacheManager: ExtendedCache);
    get(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
    private getKeys;
    cacheLandDetails(landId: string, details: any): Promise<void>;
    getCachedLandDetails(landId: string): Promise<any>;
    storeUserSession(userId: string, sessionData: any): Promise<void>;
    getUserSession(userId: string): Promise<any>;
    trackEntityStatus(entityType: string, entityId: string, status: any): Promise<void>;
    getEntityStatus(entityType: string, entityId: string): Promise<any>;
    cacheDocument(documentId: string, document: any): Promise<void>;
    getCachedDocument(documentId: string): Promise<any>;
    cacheSearchResults(searchKey: string, results: any[]): Promise<void>;
    getCachedSearchResults(searchKey: string): Promise<any[]>;
    incrementRequestCount(ip: string): Promise<number>;
    storeNotification(userId: string, notification: any): Promise<void>;
    getUserNotifications(userId: string): Promise<any[]>;
    storeTemporaryData(key: string, data: any, ttlSeconds: number): Promise<void>;
    getTemporaryData(key: string): Promise<any>;
    cacheGeoData(landId: string, geoData: any): Promise<void>;
    getCachedGeoData(landId: string): Promise<any>;
    incrementCounter(metric: string): Promise<number>;
    getMetricValue(metric: string): Promise<number>;
}
export {};
