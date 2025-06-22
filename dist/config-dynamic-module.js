"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "configModule", {
    enumerable: true,
    get: function() {
        return configModule;
    }
});
const _config = require("@nestjs/config");
const configModule = _config.ConfigModule.forRoot({
    envFilePath: [
        process.env.ENV_FILE_PATH?.trim() || '',
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        `.env.production`
    ],
    isGlobal: true
});

//# sourceMappingURL=config-dynamic-module.js.map