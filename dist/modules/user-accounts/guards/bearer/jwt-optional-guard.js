"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtOptionalAuthGuard", {
    enumerable: true,
    get: function() {
        return JwtOptionalAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let JwtOptionalAuthGuard = class JwtOptionalAuthGuard extends (0, _passport.AuthGuard)('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context, status) {
        //NOTE:super.handleRequest(err, user, info, context, status);
        // мы не будем вызывать здесь базовый метод суперкласса, в нём написано вот это:
        // кидаем ошибку если нет юзера или если другая ошибка (например JWT протух)...
        // handleRequest(err, user, info, context, status) {
        //   if (err || !user) {
        //     throw err || new common_1.UnauthorizedException();
        //   }
        //   return user;
        // }
        // а мы вернём просто null и не будем процессить ошибку и null
        if (err || !user) {
            return null;
        } else {
            return user;
        }
    }
};
JwtOptionalAuthGuard = _ts_decorate([
    (0, _common.Injectable)()
], JwtOptionalAuthGuard);

//# sourceMappingURL=jwt-optional-guard.js.map