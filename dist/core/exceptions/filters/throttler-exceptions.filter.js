"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ThrottlerExceptionFilter", {
    enumerable: true,
    get: function() {
        return ThrottlerExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _throttler = require("@nestjs/throttler");
const _coreconfig = require("../../core.config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ThrottlerExceptionFilter = class ThrottlerExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const message = 'Too many requests';
        const code = _common.HttpStatus.TOO_MANY_REQUESTS;
        const resBody = this.buildResponseBody(req.url, message);
        res.status(code).json(resBody);
    }
    buildResponseBody(reqUrl, message) {
        if (this.configService.verboseErrors) {
            return {
                timestamp: new Date().toISOString(),
                path: reqUrl,
                message
            };
        } else {
            return {
                timestamp: new Date().toISOString(),
                path: null,
                message: 'Too many requests'
            };
        }
    }
    constructor(configService){
        this.configService = configService;
    }
};
ThrottlerExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_throttler.ThrottlerException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _coreconfig.CoreConfig === "undefined" ? Object : _coreconfig.CoreConfig
    ])
], ThrottlerExceptionFilter);

//# sourceMappingURL=throttler-exceptions.filter.js.map