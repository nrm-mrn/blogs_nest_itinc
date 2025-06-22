"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DomainHttpExceptionFilter", {
    enumerable: true,
    get: function() {
        return DomainHttpExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _domainexceptions = require("../domain-exceptions");
const _domainexceptioncodes = require("../domain-exception-codes");
const _apierrorresult = require("../api-error.result");
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
let DomainHttpExceptionFilter = class DomainHttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const code = this.mapToHttpStatus(exception.code);
        let body = {};
        if (exception.extensions) {
            body = this.buildResponseBody(exception, exception.extensions);
        }
        response.status(code).json(body);
    }
    mapToHttpStatus(code) {
        switch(code){
            case _domainexceptioncodes.DomainExceptionCode.BadRequest:
            case _domainexceptioncodes.DomainExceptionCode.ValidationError:
            case _domainexceptioncodes.DomainExceptionCode.ConfirmationCodeExpired:
            case _domainexceptioncodes.DomainExceptionCode.EmailNotConfirmed:
            case _domainexceptioncodes.DomainExceptionCode.PasswordRecoveryCodeExpired:
                return _common.HttpStatus.BAD_REQUEST;
            case _domainexceptioncodes.DomainExceptionCode.Forbidden:
                return _common.HttpStatus.FORBIDDEN;
            case _domainexceptioncodes.DomainExceptionCode.NotFound:
                return _common.HttpStatus.NOT_FOUND;
            case _domainexceptioncodes.DomainExceptionCode.Unauthorized:
                return _common.HttpStatus.UNAUTHORIZED;
            case _domainexceptioncodes.DomainExceptionCode.InternalServerError:
                return _common.HttpStatus.INTERNAL_SERVER_ERROR;
            default:
                return _common.HttpStatus.I_AM_A_TEAPOT;
        }
    }
    buildResponseBody(exception, extensions) {
        const res = [];
        extensions.forEach((ext)=>{
            res.push(new _apierrorresult.FieldError(ext.message, ext.key));
        });
        if (this.configService.verboseErrors) {
            return {
                errorsMessages: res,
                message: exception.message
            };
        } else {
            return {
                errorsMessages: res
            };
        }
    }
    constructor(configService){
        this.configService = configService;
    }
};
DomainHttpExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_domainexceptions.DomainException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _coreconfig.CoreConfig === "undefined" ? Object : _coreconfig.CoreConfig
    ])
], DomainHttpExceptionFilter);

//# sourceMappingURL=domain-exception.filter.js.map