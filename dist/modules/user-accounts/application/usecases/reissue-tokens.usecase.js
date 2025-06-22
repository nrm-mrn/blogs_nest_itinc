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
    get ReissueTokensCommand () {
        return ReissueTokensCommand;
    },
    get ReissueTokensHandler () {
        return ReissueTokensHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _luxon = require("luxon");
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
let ReissueTokensCommand = class ReissueTokensCommand {
    constructor(token){
        this.token = token;
    }
};
let ReissueTokensHandler = class ReissueTokensHandler {
    async execute(command) {
        const payload = this.jwtRefreshTokService.decode(command.token);
        await this.sessionsRepository.findSessionOrFail(payload.deviceId, payload.iat);
        const rtInput = {
            userId: payload.userId,
            deviceId: payload.deviceId,
            iat: Math.floor(_luxon.DateTime.utc().toSeconds())
        };
        const refreshToken = this.jwtRefreshTokService.sign(rtInput);
        const accessToken = this.jwtAccesTokService.sign({
            id: payload.userId
        });
        await this.refreshSession(payload.deviceId, rtInput.iat);
        return {
            accessToken,
            refreshToken
        };
    }
    async refreshSession(deviceId, newIat) {
        const session = await this.sessionsRepository.findSessionByDeviceId(deviceId);
        if (!session) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'Unable to find a session for refresh'
            });
        }
        session.iat = newIat;
        await this.sessionsRepository.save(session);
        return;
    }
    constructor(jwtAccesTokService, jwtRefreshTokService, sessionsRepository){
        this.jwtAccesTokService = jwtAccesTokService;
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.sessionsRepository = sessionsRepository;
    }
};
ReissueTokensHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(ReissueTokensCommand),
    _ts_param(0, (0, _common.Inject)(_authtokeninjectconstants.ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_param(1, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _devicessecurityrepository.DevicesSecurityRepository === "undefined" ? Object : _devicessecurityrepository.DevicesSecurityRepository
    ])
], ReissueTokensHandler);

//# sourceMappingURL=reissue-tokens.usecase.js.map