"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "swaggerSetup", {
    enumerable: true,
    get: function() {
        return swaggerSetup;
    }
});
const _swagger = require("@nestjs/swagger");
function swaggerSetup(app) {
    const config = new _swagger.DocumentBuilder().setTitle('BLOGGER API').addBearerAuth().setVersion('1.0').build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Blogger Swagger'
    });
}

//# sourceMappingURL=swagger.setup.js.map