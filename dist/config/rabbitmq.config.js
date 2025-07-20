"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqConfig = void 0;
const rabbitmqConfig = (configService) => ({
    transport: 5,
    options: {
        urls: [configService.get('rabbitmq.url')],
        queue: 'land_management_queue',
        queueOptions: {
            durable: true,
        },
    },
});
exports.rabbitmqConfig = rabbitmqConfig;
//# sourceMappingURL=rabbitmq.config.js.map