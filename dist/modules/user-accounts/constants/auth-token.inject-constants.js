"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ACCESS_TOKEN_STRATEGY_INJECT_TOKEN () {
        return ACCESS_TOKEN_STRATEGY_INJECT_TOKEN;
    },
    get REFRESH_TOKEN_STRATEGY_INJECT_TOKEN () {
        return REFRESH_TOKEN_STRATEGY_INJECT_TOKEN;
    }
});
const ACCESS_TOKEN_STRATEGY_INJECT_TOKEN = Symbol('ACCESS_TOKEN_STRATEGY_INJECT_TOKEN');
const REFRESH_TOKEN_STRATEGY_INJECT_TOKEN = Symbol('REFRESH_TOKEN_STRATEGY_INJECT_TOKEN');

//# sourceMappingURL=auth-token.inject-constants.js.map