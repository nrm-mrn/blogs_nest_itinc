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
        adminUsername: process.env.ADMIN_USER,
        adminPassword: process.env.ADMIN_PASSWORD
    });
const _default = getSettings;

//# sourceMappingURL=config.module.js.map