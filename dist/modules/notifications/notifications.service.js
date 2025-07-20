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
exports.NotificationsService = exports.NotificationType = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
var NotificationType;
(function (NotificationType) {
    NotificationType["LAND_REGISTERED"] = "LAND_REGISTERED";
    NotificationType["LAND_VERIFIED"] = "LAND_VERIFIED";
    NotificationType["LAND_UPDATED"] = "LAND_UPDATED";
    NotificationType["TRANSFER_INITIATED"] = "TRANSFER_INITIATED";
    NotificationType["TRANSFER_PENDING_APPROVAL"] = "TRANSFER_PENDING_APPROVAL";
    NotificationType["TRANSFER_APPROVED"] = "TRANSFER_APPROVED";
    NotificationType["TRANSFER_COMPLETED"] = "TRANSFER_COMPLETED";
    NotificationType["TRANSFER_REJECTED"] = "TRANSFER_REJECTED";
    NotificationType["PERMIT_APPLIED"] = "PERMIT_APPLIED";
    NotificationType["PERMIT_APPROVED"] = "PERMIT_APPROVED";
    NotificationType["PERMIT_REJECTED"] = "PERMIT_REJECTED";
    NotificationType["DISPUTE_FILED"] = "DISPUTE_FILED";
    NotificationType["DISPUTE_RESOLVED"] = "DISPUTE_RESOLVED";
    NotificationType["DISPUTE_UPDATED"] = "DISPUTE_UPDATED";
    NotificationType["TAX_ASSESSED"] = "TAX_ASSESSED";
    NotificationType["TAX_PAID"] = "TAX_PAID";
    NotificationType["TAX_OVERDUE"] = "TAX_OVERDUE";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
let NotificationsService = class NotificationsService {
    cacheManager;
    rabbitMQService;
    server;
    constructor(cacheManager, rabbitMQService) {
        this.cacheManager = cacheManager;
        this.rabbitMQService = rabbitMQService;
    }
    async sendNotification(userId, type, data) {
        const notification = {
            id: Date.now().toString(),
            userId,
            type,
            data,
            timestamp: new Date(),
            read: false
        };
        await this.cacheManager.set(`notification:${userId}:${notification.id}`, notification, 604800);
        this.server.to(userId).emit('notification', notification);
        await this.rabbitMQService.emit(rabbitmq_service_1.RabbitMQEvents.USER_NOTIFICATION, {
            ...notification,
            channels: ['email', 'sms']
        });
        return notification;
    }
    async getUserNotifications(userId) {
        const keys = await this.cacheManager.store.keys(`notification:${userId}:*`);
        const notifications = await Promise.all(keys.map(key => this.cacheManager.get(key)));
        return notifications
            .filter((n) => n !== null)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    async getUnreadNotifications(userId) {
        const notifications = await this.getUserNotifications(userId);
        return notifications.filter(n => !n.read);
    }
    async markAsRead(userId, notificationId) {
        const key = `notification:${userId}:${notificationId}`;
        const notification = await this.cacheManager.get(key);
        if (notification) {
            notification.read = true;
            await this.cacheManager.set(key, notification, 604800);
        }
    }
    async markAllAsRead(userId) {
        const notifications = await this.getUserNotifications(userId);
        await Promise.all(notifications.map(async (notification) => {
            notification.read = true;
            await this.cacheManager.set(`notification:${userId}:${notification.id}`, notification, 604800);
        }));
    }
    async trackStatus(entityType, entityId, status) {
        const statusUpdate = {
            status,
            entityType,
            entityId,
            updatedAt: new Date()
        };
        const key = `status:${entityType}:${entityId}`;
        await this.cacheManager.set(key, statusUpdate);
        this.server.to(`${entityType}:${entityId}`).emit('statusUpdate', statusUpdate);
        await this.rabbitMQService.emit(rabbitmq_service_1.RabbitMQEvents.STATUS_UPDATE, statusUpdate);
    }
    async getStatus(entityType, entityId) {
        const key = `status:${entityType}:${entityId}`;
        return this.cacheManager.get(key);
    }
    async subscribeToEntity(userId, entityType, entityId) {
        const socket = this.server.sockets.sockets.get(userId);
        if (socket) {
            await socket.join(`${entityType}:${entityId}`);
        }
    }
    async unsubscribeFromEntity(userId, entityType, entityId) {
        const socket = this.server.sockets.sockets.get(userId);
        if (socket) {
            await socket.leave(`${entityType}:${entityId}`);
        }
    }
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsService.prototype, "server", void 0);
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => rabbitmq_service_1.RabbitMQService))),
    __metadata("design:paramtypes", [Object, rabbitmq_service_1.RabbitMQService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map