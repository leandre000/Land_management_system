"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_service_1 = require("./rabbitmq.service");
const event_listener_service_1 = require("./event-listener.service");
const notifications_module_1 = require("../notifications/notifications.module");
const audit_logs_module_1 = require("../audit-logs/audit-logs.module");
let RabbitMQModule = class RabbitMQModule {
};
exports.RabbitMQModule = RabbitMQModule;
exports.RabbitMQModule = RabbitMQModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'LAND_MANAGEMENT_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'land_management_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
            ]),
            notifications_module_1.NotificationsModule,
            (0, common_1.forwardRef)(() => audit_logs_module_1.AuditLogsModule),
        ],
        providers: [rabbitmq_service_1.RabbitMQService, event_listener_service_1.EventListenerService],
        exports: [rabbitmq_service_1.RabbitMQService],
    })
], RabbitMQModule);
//# sourceMappingURL=rabbitmq.module.js.map