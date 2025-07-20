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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let NotificationsController = class NotificationsController {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async getUserNotifications(req) {
        return this.notificationsService.getUserNotifications(req.user.id);
    }
    async getUnreadNotifications(req) {
        return this.notificationsService.getUnreadNotifications(req.user.id);
    }
    async markAsRead(req, notificationId) {
        await this.notificationsService.markAsRead(req.user.id, notificationId);
        return { message: 'Notification marked as read' };
    }
    async markAllAsRead(req) {
        await this.notificationsService.markAllAsRead(req.user.id);
        return { message: 'All notifications marked as read' };
    }
    async getStatus(entityType, entityId) {
        return this.notificationsService.getStatus(entityType, entityId);
    }
    async subscribeToEntity(req, entityType, entityId) {
        await this.notificationsService.subscribeToEntity(req.user.id, entityType, entityId);
        return { message: 'Subscribed to entity updates' };
    }
    async unsubscribeFromEntity(req, entityType, entityId) {
        await this.notificationsService.unsubscribeFromEntity(req.user.id, entityType, entityId);
        return { message: 'Unsubscribed from entity updates' };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all notifications for the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all notifications' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUserNotifications", null);
__decorate([
    (0, common_1.Get)('unread'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread notifications for the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns unread notifications' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getUnreadNotifications", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a notification as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marked as read' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)('read-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All notifications marked as read' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Get)('status/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get status updates for an entity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns entity status' }),
    __param(0, (0, common_1.Param)('entityType')),
    __param(1, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('subscribe/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to entity updates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscribed to entity updates' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('entityType')),
    __param(2, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "subscribeToEntity", null);
__decorate([
    (0, common_1.Post)('unsubscribe/:entityType/:entityId'),
    (0, swagger_1.ApiOperation)({ summary: 'Unsubscribe from entity updates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Unsubscribed from entity updates' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('entityType')),
    __param(2, (0, common_1.Param)('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "unsubscribeFromEntity", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map