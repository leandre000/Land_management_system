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
exports.RabbitMQService = exports.RabbitMQEvents = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
var RabbitMQEvents;
(function (RabbitMQEvents) {
    RabbitMQEvents["LAND_REGISTERED"] = "land.registered";
    RabbitMQEvents["LAND_VERIFIED"] = "land.verified";
    RabbitMQEvents["LAND_UPDATED"] = "land.updated";
    RabbitMQEvents["USER_NOTIFICATION"] = "user.notification";
    RabbitMQEvents["STATUS_UPDATE"] = "status.update";
    RabbitMQEvents["GEOJSON_PROCESSED"] = "geojson.processed";
    RabbitMQEvents["DOCUMENT_GENERATION_REQUESTED"] = "document.generation.requested";
    RabbitMQEvents["AUDIT_LOG_CREATED"] = "audit.log.created";
})(RabbitMQEvents || (exports.RabbitMQEvents = RabbitMQEvents = {}));
let RabbitMQService = class RabbitMQService {
    client;
    constructor(client) {
        this.client = client;
    }
    async emit(event, data) {
        return this.client.emit(event, {
            data,
            timestamp: new Date(),
            eventId: this.generateEventId(),
        });
    }
    generateEventId() {
        return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    async handleLandRegistration(landId, data) {
        await this.emit(RabbitMQEvents.LAND_REGISTERED, {
            landId,
            ...data,
        });
    }
    async handleLandVerification(landId, data) {
        await this.emit(RabbitMQEvents.LAND_VERIFIED, {
            landId,
            ...data,
        });
    }
    async handleLandUpdate(landId, data) {
        await this.emit(RabbitMQEvents.LAND_UPDATED, {
            landId,
            ...data,
        });
    }
    async handleUserNotification(userId, type, data) {
        await this.emit(RabbitMQEvents.USER_NOTIFICATION, {
            userId,
            type,
            ...data,
        });
    }
    async handleStatusUpdate(data) {
        await this.emit(RabbitMQEvents.STATUS_UPDATE, data);
    }
    async handleGeoJsonProcessed(landId, geoJsonData, processedData) {
        await this.emit(RabbitMQEvents.GEOJSON_PROCESSED, {
            landId,
            geoJsonData,
            processedData,
        });
    }
    async handleDocumentGenerationRequest(landId, documentType, userId) {
        await this.emit(RabbitMQEvents.DOCUMENT_GENERATION_REQUESTED, {
            landId,
            documentType,
            userId,
            requestedAt: new Date(),
        });
    }
    async handleAuditLogCreated(auditLogId, data) {
        await this.emit(RabbitMQEvents.AUDIT_LOG_CREATED, {
            auditLogId,
            ...data,
        });
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('LAND_MANAGEMENT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map