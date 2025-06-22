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
    get LogoutAnotherSessionCommand () {
        return LogoutAnotherSessionCommand;
    },
    get LogoutAnotherSessionHandler () {
        return LogoutAnotherSessionHandler;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _jwt = require("@nestjs/jwt");
const _authtokeninjectconstants = require("../../constants/auth-token.inject-constants");
const _devicessecurityrepository = require("../../infrastructure/devices-security.repository");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let LogoutAnotherSessionCommand = class LogoutAnotherSessionCommand {
    constructor(token, deviceId){
        this.token = token;
        this.deviceId = deviceId;
    }
};
let LogoutAnotherSessionHandler = class LogoutAnotherSessionHandler {
    async execute(command) {
        const payload = this.jwtRefreshTokService.decode(command.token);
        const deviceId = payload.deviceId;
        //NOTE: check that refresh token session is active
        const session = await this.sessionsRepository.findSessionOrFail(deviceId, payload.iat);
        //NOTE: check that userId is the same in token and in the deviceToDelete
        const targetSession = await this.sessionsRepository.findSessionByDeviceId(command.deviceId);
        if (!targetSession) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.NotFound,
                message: 'Session does not exist or already expired'
            });
        }
        if (targetSession.userId !== session.userId) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Forbidden,
                message: 'Could not delete session of another user'
            });
        }
        return this.sessionsRepository.deleteSession(targetSession);
    }
    constructor(sessionsRepository, jwtRefreshTokService){
        this.sessionsRepository = sessionsRepository;
        this.jwtRefreshTokService = jwtRefreshTokService;
    }
};
LogoutAnotherSessionHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(LogoutAnotherSessionCommand),
    _ts_param(1, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _devicessecurityrepository.DevicesSecurityRepository === "undefined" ? Object : _devicessecurityrepository.DevicesSecurityRepository,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], LogoutAnotherSessionHandler);

//# sourceMappingURL=logout-another-session.usecase.js.map