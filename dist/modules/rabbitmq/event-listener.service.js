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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const notifications_service_1 = require("../notifications/notifications.service");
const rabbitmq_service_1 = require("./rabbitmq.service");
let EventListenerService = class EventListenerService {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async handleLandRegistered(payload) {
        if (payload.data.owner) {
            await this.notificationsService.sendNotification(payload.data.owner.id, notifications_service_1.NotificationType.LAND_REGISTERED, {
                landId: payload.data.id,
                plotNumber: payload.data.plotNumber,
                location: payload.data.location,
            });
        }
    }
    async handleLandVerified(payload) {
        if (payload.data.owner) {
            await this.notificationsService.sendNotification(payload.data.owner.id, notifications_service_1.NotificationType.LAND_VERIFIED, {
                landId: payload.data.id,
                plotNumber: payload.data.plotNumber,
                verifiedBy: payload.data.verifiedBy?.fullName,
                verificationDate: payload.data.verificationDate,
            });
        }
    }
    async handleLandUpdated(payload) {
        if (payload.data.owner) {
            await this.notificationsService.sendNotification(payload.data.owner.id, notifications_service_1.NotificationType.LAND_UPDATED, {
                landId: payload.data.id,
                plotNumber: payload.data.plotNumber,
                changes: payload.data.changes,
            });
        }
    }
    async handleUserNotification(payload) {
        await this.notificationsService.sendNotification(payload.userId, payload.type, payload.data);
    }
    async handleStatusUpdate(payload) {
        if (payload.userId) {
            await this.notificationsService.sendNotification(payload.userId, payload.type, payload.data);
        }
    }
};
exports.EventListenerService = EventListenerService;
__decorate([
    (0, event_emitter_1.OnEvent)(rabbitmq_service_1.RabbitMQEvents.LAND_REGISTERED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleLandRegistered", null);
__decorate([
    (0, event_emitter_1.OnEvent)(rabbitmq_service_1.RabbitMQEvents.LAND_VERIFIED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleLandVerified", null);
__decorate([
    (0, event_emitter_1.OnEvent)(rabbitmq_service_1.RabbitMQEvents.LAND_UPDATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleLandUpdated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(rabbitmq_service_1.RabbitMQEvents.USER_NOTIFICATION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleUserNotification", null);
__decorate([
    (0, event_emitter_1.OnEvent)(rabbitmq_service_1.RabbitMQEvents.STATUS_UPDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleStatusUpdate", null);
exports.EventListenerService = EventListenerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], EventListenerService);
//# sourceMappingURL=event-listener.service.js.map