"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appsetup = require("./setup/app.setup");
const _coreconfig = require("./core/core.config");
const _initappmodule = require("./init-app-module");
async function bootstrap() {
    const DynamicAppModule = await (0, _initappmodule.initAppModule)();
    const app = await _core.NestFactory.create(DynamicAppModule);
    const configService = app.get(_coreconfig.CoreConfig);
    (0, _appsetup.appSetup)(app);
    const port = configService.port;
    await app.listen(port);
}
void bootstrap();

//# sourceMappingURL=main.js.map