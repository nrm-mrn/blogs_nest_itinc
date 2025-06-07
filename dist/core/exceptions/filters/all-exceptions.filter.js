"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AllExceptionFilter", {
    enumerable: true,
    get: function() {
        return AllExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _domainexceptioncodes = require("../domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AllExceptionFilter = class AllExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const message = exception.message || 'Unknown exception occured';
        const code = _common.HttpStatus.INTERNAL_SERVER_ERROR;
        const resBody = this.buildResponseBody(req.url, message);
        res.status(code).json(resBody);
    }
    buildResponseBody(reqUrl, message) {
        if (this.configService.get('nodeEnv') === 'production') {
            return {
                timestamp: new Date().toISOString(),
                path: null,
                message: 'Server error occured',
                extensions: [],
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError
            };
        } else {
            return {
                timestamp: new Date().toISOString(),
                path: reqUrl,
                message,
                extensions: [],
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError
            };
        }
    }
    constructor(configService){
        this.configService = configService;
    }
};
AllExceptionFilter = _ts_decorate([
    (0, _common.Catch)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], AllExceptionFilter);

//# sourceMappingURL=all-exceptions.filter.js.map