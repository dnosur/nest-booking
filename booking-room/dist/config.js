"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    server: {
        get port() {
            return 3002;
        },
        get protocol() {
            return 'http';
        },
        get host() {
            return config.isLocal ? 'localhost' : '';
        },
    },
    bcrypt: {
        saltRounds: 10,
    },
    isLocal: true,
    jwt: {
        JWT_USER_SECRET: 'JGHDFG^UR&@^SUVY6o8gildhn37o8fx3ygøˆ©∫•¶•§¶∞§¢∂¥†√∫˜¶•§ˆÁ¨ØıÎ§32rgf732v8od7of2giuo1o286d67',
    },
    regex: {
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    db: {
        name: 'user_events',
        password: '',
        user: 'macbook',
        host: 'localhost',
        port: '5432',
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map