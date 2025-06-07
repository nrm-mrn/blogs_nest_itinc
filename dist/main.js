"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _appsetup = require("./setup/app.setup");
const _config = require("@nestjs/config");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    (0, _appsetup.appSetup)(app);
    const configService = app.get(_config.ConfigService);
    const port = configService.get('port', {
        infer: true
    });
    await app.listen(port);
}
void bootstrap();

//# sourceMappingURL=main.js.map