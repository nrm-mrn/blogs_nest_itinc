"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _luxon = require("luxon");
const getSettings = ()=>({
        nodeEnv: process.env.NODE_ENV || 'production',
        dbURL: process.env.DB_URL,
        dbName: process.env.DB_NAME,
        port: parseInt(process.env.PORT, 10) || 3000,
        passRecoveryExpiration: _luxon.Duration.fromObject({
            minutes: 10
        }),
        emailExpiration: _luxon.Duration.fromObject({
            minutes: 10
        }),
        adminUsername: process.env.ADMIN_USERNAME,
        adminPassword: process.env.ADMIN_PASSWORD,
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        accessTokenDuration: +process.env.JWT_EXP_TIME_IN_SECONDS,
        refreshTokenDuration: +process.env.REFRESHT_TIME_IN_SECONDS,
        mailerHost: process.env.EMAIL_HOST,
        mailerLogin: process.env.EMAIL,
        mailerPass: process.env.EMAIL_PASS,
        confirmationCodesDomain: process.env.CONFIRMATION_CODES_DOMAIN,
        requestsTtl: +process.env.THROTTLER_REQUESTS_TTL_IN_MS,
        requestsLimit: +process.env.THROTTLER_REQUESTS_LIMIT
    });
const _default = getSettings;

//# sourceMappingURL=config.module.js.map