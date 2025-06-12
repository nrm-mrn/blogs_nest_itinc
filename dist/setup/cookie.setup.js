"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cookieParserSetup", {
    enumerable: true,
    get: function() {
        return cookieParserSetup;
    }
});
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function cookieParserSetup(app) {
    app.use((0, _cookieparser.default)());
}

//# sourceMappingURL=cookie.setup.js.map