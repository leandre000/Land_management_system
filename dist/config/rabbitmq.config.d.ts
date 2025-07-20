import { ConfigService } from '@nestjs/config';
export declare const rabbitmqConfig: (configService: ConfigService) => {
    transport: number;
    options: {
        urls: any[];
        queue: string;
        queueOptions: {
            durable: boolean;
        };
    };
};
