"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initAppModule", {
    enumerable: true,
    get: function() {
        return initAppModule;
    }
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _coreconfig = require("./core/core.config");
async function initAppModule() {
    const appContext = await _core.NestFactory.createApplicationContext(_appmodule.AppModule);
    const coreConfig = appContext.get(_coreconfig.CoreConfig);
    await appContext.close();
    return _appmodule.AppModule.forRoot(coreConfig);
}

//# sourceMappingURL=init-app-module.js.map