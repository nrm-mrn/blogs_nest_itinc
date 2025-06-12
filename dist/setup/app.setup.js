"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "appSetup", {
    enumerable: true,
    get: function() {
        return appSetup;
    }
});
const _swaggersetup = require("./swagger.setup");
const _pipessetup = require("./pipes.setup");
const _cookiesetup = require("./cookie.setup");
function appSetup(app) {
    (0, _cookiesetup.cookieParserSetup)(app);
    (0, _pipessetup.pipesSetup)(app);
    (0, _swaggersetup.swaggerSetup)(app);
}

//# sourceMappingURL=app.setup.js.map