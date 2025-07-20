import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface ExtendedCache extends Cache {
  store: {
    keys: (pattern: string) => Promise<string[]>;
  };
}

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: ExtendedCache) {}

  // Generic cache operations
  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    // Reset is not available in cache-manager v5, we'll clear all keys instead
    const keys = await this.getKeys('*');
    await Promise.all(keys.map(key => this.del(key)));
  }

  private async getKeys(pattern: string): Promise<string[]> {
    try {
      return await this.cacheManager.store.keys(pattern);
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  // Land management specific caching
  async cacheLandDetails(landId: string, details: any): Promise<void> {
    await this.set(`land:${landId}`, details, 3600); // 1 hour TTL
  }

  async getCachedLandDetails(landId: string): Promise<any> {
    return this.get(`land:${landId}`);
  }

  // User session management
  async storeUserSession(userId: string, sessionData: any): Promise<void> {
    await this.set(`session:${userId}`, sessionData, 86400); // 24 hours TTL
  }

  async getUserSession(userId: string): Promise<any> {
    return this.get(`session:${userId}`);
  }

  // Status tracking
  async trackEntityStatus(entityType: string, entityId: string, status: any): Promise<void> {
    const key = `status:${entityType}:${entityId}`;
    await this.set(key, {
      ...status,
      updatedAt: new Date(),
    });
  }

  async getEntityStatus(entityType: string, entityId: string): Promise<any> {
    return this.get(`status:${entityType}:${entityId}`);
  }

  // Document caching
  async cacheDocument(documentId: string, document: any): Promise<void> {
    await this.set(`document:${documentId}`, document, 1800); // 30 minutes TTL
  }

  async getCachedDocument(documentId: string): Promise<any> {
    return this.get(`document:${documentId}`);
  }

  // Search results caching
  async cacheSearchResults(searchKey: string, results: any[]): Promise<void> {
    await this.set(`search:${searchKey}`, results, 300); // 5 minutes TTL
  }

  async getCachedSearchResults(searchKey: string): Promise<any[]> {
    return this.get(`search:${searchKey}`);
  }

  // Rate limiting
  async incrementRequestCount(ip: string): Promise<number> {
    const key = `ratelimit:${ip}`;
    const count = (await this.get(key)) || 0;
    await this.set(key, count + 1, 60); // 1 minute window
    return count + 1;
  }

  // Notifications
  async storeNotification(userId: string, notification: any): Promise<void> {
    const key = `notification:${userId}:${notification.id}`;
    await this.set(key, notification, 604800); // 7 days TTL
  }

  async getUserNotifications(userId: string): Promise<any[]> {
    const keys = await this.getKeys(`notification:${userId}:*`);
    const notifications = await Promise.all(
      keys.map(key => this.get(key))
    );
    return notifications
      .filter(n => n !== null)
      .sort((a: any, b: any) => b.timestamp - a.timestamp);
  }

  // Temporary data storage
  async storeTemporaryData(key: string, data: any, ttlSeconds: number): Promise<void> {
    await this.set(`temp:${key}`, data, ttlSeconds);
  }

  async getTemporaryData(key: string): Promise<any> {
    return this.get(`temp:${key}`);
  }

  // Geospatial data caching
  async cacheGeoData(landId: string, geoData: any): Promise<void> {
    await this.set(`geo:${landId}`, geoData, 86400); // 24 hours TTL
  }

  async getCachedGeoData(landId: string): Promise<any> {
    return this.get(`geo:${landId}`);
  }

  // Analytics data
  async incrementCounter(metric: string): Promise<number> {
    const key = `analytics:${metric}`;
    const count = (await this.get(key)) || 0;
    await this.set(key, count + 1);
    return count + 1;
  }

  async getMetricValue(metric: string): Promise<number> {
    return this.get(`analytics:${metric}`) || 0;
  }
} 