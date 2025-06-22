"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BasicAuthGuard", {
    enumerable: true,
    get: function() {
        return BasicAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _publicdecorator = require("../decorators/public.decorator");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _useraccountconfig = require("../../config/user-account.config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BasicAuthGuard = class BasicAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const isPublic = this.reflector.getAllAndOverride(_publicdecorator.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true;
        }
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'unauthorized'
            });
        }
        const adminUsername = this.configService.adminUsername;
        const adminPassword = this.configService.adminPassword;
        const base64Creds = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Creds, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        if (username === adminUsername && password === adminPassword) {
            return true;
        } else {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'unauthorized'
            });
        }
    }
    constructor(configService, reflector){
        this.configService = configService;
        this.reflector = reflector;
    }
};
BasicAuthGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig,
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], BasicAuthGuard);

//# sourceMappingURL=basic-auth.guard.js.map