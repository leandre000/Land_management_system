declare const _default: () => {
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    redis: {
        host: string;
        port: number;
    };
    rabbitmq: {
        url: string;
    };
};
export default _default;
