"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevicesSecurityController", {
    enumerable: true,
    get: function() {
        return DevicesSecurityController;
    }
});
const _common = require("@nestjs/common");
const _devicessecurityservice = require("../application/devices-security.service");
const _jwt = require("@nestjs/jwt");
const _devicessecurityqueryrepository = require("../infrastructure/query/devices-security.query-repository");
const _jwtrefreshtokenguard = require("../guards/bearer/jwt-refresh-token-guard");
const _express = require("express");
const _objectidvalidationpipeservice = require("../../../core/pipes/object-id-validation-pipe.service");
const _authtokeninjectconstants = require("../constants/auth-token.inject-constants");
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
let DevicesSecurityController = class DevicesSecurityController {
    async getDevices(req) {
        const token = req.cookies.refreshToken;
        const payload = this.jwtRefreshTokService.decode(token);
        return this.sessionsQueryRepo.getSessionsOrFail(payload.userId);
    }
    async deleteAnotherSession(req, deviceId) {
        const token = req.cookies.refreshToken;
        await this.sessionsService.deleteAnotherSession(token, deviceId);
    }
    async deleteOtherSessions(req) {
        return this.sessionsService.deleteOtherSessions(req.cookies.refreshToken);
    }
    constructor(sessionsService, jwtRefreshTokService, sessionsQueryRepo){
        this.sessionsService = sessionsService;
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.sessionsQueryRepo = sessionsQueryRepo;
    }
};
_ts_decorate([
    (0, _common.Get)('devices'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], DevicesSecurityController.prototype, "getDevices", null);
_ts_decorate([
    (0, _common.Delete)('devices/:deviceId'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Param)('deviceId', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DevicesSecurityController.prototype, "deleteAnotherSession", null);
_ts_decorate([
    (0, _common.Delete)('devices/'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], DevicesSecurityController.prototype, "deleteOtherSessions", null);
DevicesSecurityController = _ts_decorate([
    (0, _common.UseGuards)(_jwtrefreshtokenguard.RefreshTokenGuard),
    (0, _common.Controller)('security'),
    _ts_param(1, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _devicessecurityservice.SessionsService === "undefined" ? Object : _devicessecurityservice.SessionsService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _devicessecurityqueryrepository.SessionsQueryRepository === "undefined" ? Object : _devicessecurityqueryrepository.SessionsQueryRepository
    ])
], DevicesSecurityController);

//# sourceMappingURL=devices-security.controller.js.map