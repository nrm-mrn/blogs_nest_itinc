"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtAuthGuard", {
    enumerable: true,
    get: function() {
        return JwtAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let JwtAuthGuard = class JwtAuthGuard extends (0, _passport.AuthGuard)('jwt') {
    handleRequest(err, user) {
        if (err || !user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Unauthorized'
            });
        }
        return user;
    }
};
JwtAuthGuard = _ts_decorate([
    (0, _common.Injectable)()
], JwtAuthGuard);

//# sourceMappingURL=jwt-auth.guard.js.map