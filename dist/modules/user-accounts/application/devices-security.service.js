"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SessionsService", {
    enumerable: true,
    get: function() {
        return SessionsService;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _devicessecurityrepository = require("../infrastructure/devices-security.repository");
const _mongoose = require("@nestjs/mongoose");
const _sessionentity = require("../domain/session.entity");
const _mongoose1 = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _luxon = require("luxon");
const _config = require("@nestjs/config");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
const _authtokeninjectconstants = require("../constants/auth-token.inject-constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let SessionsService = class SessionsService {
    async saveSession(input) {
        const domainInput = {
            ...input,
            deviceId: new _mongoose1.default.Types.ObjectId(input.deviceId),
            expiration: _luxon.DateTime.utc().plus(_luxon.Duration.fromMillis(this.configService.get('refreshTokenDuration') * 60 * 1000)).toJSDate()
        };
        const session = this.SessionModel.createSession(domainInput);
        const deviceId = await this.sessionsRepository.save(session);
        return {
            deviceId
        };
    }
    async getSession(deviceId, iat) {
        const timestamp = new Date(iat);
        const session = await this.sessionsRepository.findSessionOrFail(deviceId, timestamp);
        return session;
    }
    async refreshSession(deviceId, newIat) {
        const session = await this.sessionsRepository.findSessionByDeviceId(deviceId);
        if (!session) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'Unable to find a session for refresh'
            });
        }
        const iat = new Date(newIat);
        session.iat = iat;
        await this.sessionsRepository.save(session);
        return;
    }
    async logout(token) {
        const payload = this.jwtRefreshTokService.verify(token);
        //NOTE: check that refresh token session is active
        const lastActiveDate = new Date(payload.iat);
        const session = await this.sessionsRepository.findSessionOrFail(payload.deviceId, lastActiveDate);
        return this.sessionsRepository.deleteSession(session);
    }
    async deleteAnotherSession(token, deviceToDelete) {
        const payload = this.jwtRefreshTokService.decode(token);
        const deviceId = payload.deviceId;
        //NOTE: check that refresh token session is active
        const lastActiveDate = new Date(payload.iat);
        const session = await this.sessionsRepository.findSessionOrFail(deviceId, lastActiveDate);
        //NOTE: check that userId is the same in token and in the deviceToDelete
        const targetSession = await this.sessionsRepository.findSessionByDeviceId(deviceToDelete);
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
    async deleteOtherSessions(token) {
        const payload = this.jwtRefreshTokService.decode(token);
        const deviceId = payload.deviceId;
        const iat = new Date(payload.iat);
        await this.sessionsRepository.findSessionOrFail(deviceId, iat);
        return this.sessionsRepository.deleteOtherSessions(iat, payload.userId);
    }
    constructor(SessionModel, sessionsRepository, jwtRefreshTokService, configService){
        this.SessionModel = SessionModel;
        this.sessionsRepository = sessionsRepository;
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.configService = configService;
    }
};
SessionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_sessionentity.DeviceAuthSession.name)),
    _ts_param(2, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sessionentity.SessionModelType === "undefined" ? Object : _sessionentity.SessionModelType,
        typeof _devicessecurityrepository.DevicesSecurityRepository === "undefined" ? Object : _devicessecurityrepository.DevicesSecurityRepository,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], SessionsService);

//# sourceMappingURL=devices-security.service.js.map