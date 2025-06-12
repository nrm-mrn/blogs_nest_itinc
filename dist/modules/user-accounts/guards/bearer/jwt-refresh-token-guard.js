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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
            await this.jwtService.verify(refreshToken);
        } catch  {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Invalid refresh token presented'
            });
        }
        return true;
    }
    constructor(jwtService){
        this.jwtService = jwtService;
    }
};
RefreshTokenGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], RefreshTokenGuard);

//# sourceMappingURL=jwt-refresh-token-guard.js.map