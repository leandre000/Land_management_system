"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
let RedisService = class RedisService {
    cacheManager;
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async get(key) {
        return this.cacheManager.get(key);
    }
    async set(key, value, ttl) {
        await this.cacheManager.set(key, value, ttl);
    }
    async del(key) {
        await this.cacheManager.del(key);
    }
    async reset() {
        const keys = await this.getKeys('*');
        await Promise.all(keys.map(key => this.del(key)));
    }
    async getKeys(pattern) {
        try {
            return await this.cacheManager.store.keys(pattern);
        }
        catch (error) {
            console.error('Error getting keys:', error);
            return [];
        }
    }
    async cacheLandDetails(landId, details) {
        await this.set(`land:${landId}`, details, 3600);
    }
    async getCachedLandDetails(landId) {
        return this.get(`land:${landId}`);
    }
    async storeUserSession(userId, sessionData) {
        await this.set(`session:${userId}`, sessionData, 86400);
    }
    async getUserSession(userId) {
        return this.get(`session:${userId}`);
    }
    async trackEntityStatus(entityType, entityId, status) {
        const key = `status:${entityType}:${entityId}`;
        await this.set(key, {
            ...status,
            updatedAt: new Date(),
        });
    }
    async getEntityStatus(entityType, entityId) {
        return this.get(`status:${entityType}:${entityId}`);
    }
    async cacheDocument(documentId, document) {
        await this.set(`document:${documentId}`, document, 1800);
    }
    async getCachedDocument(documentId) {
        return this.get(`document:${documentId}`);
    }
    async cacheSearchResults(searchKey, results) {
        await this.set(`search:${searchKey}`, results, 300);
    }
    async getCachedSearchResults(searchKey) {
        return this.get(`search:${searchKey}`);
    }
    async incrementRequestCount(ip) {
        const key = `ratelimit:${ip}`;
        const count = (await this.get(key)) || 0;
        await this.set(key, count + 1, 60);
        return count + 1;
    }
    async storeNotification(userId, notification) {
        const key = `notification:${userId}:${notification.id}`;
        await this.set(key, notification, 604800);
    }
    async getUserNotifications(userId) {
        const keys = await this.getKeys(`notification:${userId}:*`);
        const notifications = await Promise.all(keys.map(key => this.get(key)));
        return notifications
            .filter(n => n !== null)
            .sort((a, b) => b.timestamp - a.timestamp);
    }
    async storeTemporaryData(key, data, ttlSeconds) {
        await this.set(`temp:${key}`, data, ttlSeconds);
    }
    async getTemporaryData(key) {
        return this.get(`temp:${key}`);
    }
    async cacheGeoData(landId, geoData) {
        await this.set(`geo:${landId}`, geoData, 86400);
    }
    async getCachedGeoData(landId) {
        return this.get(`geo:${landId}`);
    }
    async incrementCounter(metric) {
        const key = `analytics:${metric}`;
        const count = (await this.get(key)) || 0;
        await this.set(key, count + 1);
        return count + 1;
    }
    async getMetricValue(metric) {
        return this.get(`analytics:${metric}`) || 0;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map