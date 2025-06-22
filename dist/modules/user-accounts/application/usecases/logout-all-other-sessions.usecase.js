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
    get LogoutOtherSessionHandler () {
        return LogoutOtherSessionHandler;
    },
    get LogoutOtherSessionsCommand () {
        return LogoutOtherSessionsCommand;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _jwt = require("@nestjs/jwt");
const _authtokeninjectconstants = require("../../constants/auth-token.inject-constants");
const _devicessecurityrepository = require("../../infrastructure/devices-security.repository");
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
let LogoutOtherSessionsCommand = class LogoutOtherSessionsCommand {
    constructor(token){
        this.token = token;
    }
};
let LogoutOtherSessionHandler = class LogoutOtherSessionHandler {
    async execute(command) {
        const payload = this.jwtRefreshTokService.decode(command.token);
        const deviceId = payload.deviceId;
        await this.sessionsRepository.findSessionOrFail(deviceId, payload.iat);
        return this.sessionsRepository.deleteOtherSessions(payload.iat, payload.userId);
    }
    constructor(sessionsRepository, jwtRefreshTokService){
        this.sessionsRepository = sessionsRepository;
        this.jwtRefreshTokService = jwtRefreshTokService;
    }
};
LogoutOtherSessionHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(LogoutOtherSessionsCommand),
    _ts_param(1, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _devicessecurityrepository.DevicesSecurityRepository === "undefined" ? Object : _devicessecurityrepository.DevicesSecurityRepository,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], LogoutOtherSessionHandler);

//# sourceMappingURL=logout-all-other-sessions.usecase.js.map