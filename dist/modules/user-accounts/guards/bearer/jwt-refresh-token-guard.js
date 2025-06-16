"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RefreshTokenGuard", {
    enumerable: true,
    get: function() {
        return RefreshTokenGuard;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _authtokeninjectconstants = require("../../constants/auth-token.inject-constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let RefreshTokenGuard = class RefreshTokenGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'No refresh token present in cookies'
            });
        }
        try {
            await this.jwtRefreshTokService.verify(refreshToken);
        } catch  {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Invalid refresh token presented'
            });
        }
        return true;
    }
    constructor(jwtRefreshTokService){
        this.jwtRefreshTokService = jwtRefreshTokService;
    }
};
RefreshTokenGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], RefreshTokenGuard);

//# sourceMappingURL=jwt-refresh-token-guard.js.map