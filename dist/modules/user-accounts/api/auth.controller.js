"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _userlogindto = require("./input-dto/user-login-dto");
const _express = require("express");
const _extractuserfromrequestdecorator = require("../guards/decorators/extract-user-from-request.decorator");
const _usercontextdto = require("../guards/dto/user-context.dto");
const _registeruserinputdto = require("./input-dto/register-user.input-dto");
const _resendemailinputdto = require("./input-dto/resend-email.input-dto");
const _emailconfirminputdto = require("./input-dto/email-confirm.input-dto");
const _passrecoverinputdto = require("./input-dto/pass-recover.input-dto");
const _passconfirminputdto = require("./input-dto/pass-confirm.input-dto");
const _jwtauthguard = require("../guards/bearer/jwt-auth.guard");
const _jwtrefreshtokenguard = require("../guards/bearer/jwt-refresh-token-guard");
const _throttler = require("@nestjs/throttler");
const _cqrs = require("@nestjs/cqrs");
const _getuserinfoquery = require("../application/queries/get-user-info.query");
const _registeruserusecase = require("../application/usecases/register-user.usecase");
const _resendemailconfirmationusecase = require("../application/usecases/resend-email-confirmation.usecase");
const _loginuserusecase = require("../application/usecases/login-user.usecase");
const _confirmuseremailusecase = require("../application/usecases/confirm-user-email.usecase");
const _reissuetokensusecase = require("../application/usecases/reissue-tokens.usecase");
const _recoverpasswordusecase = require("../application/usecases/recover-password.usecase");
const _confirmnewpasswordusecase = require("../application/usecases/confirm-new-password.usecase");
const _logoutuserusecase = require("../application/usecases/logout-user.usecase");
const _useraccountconfig = require("../config/user-account.config");
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
let AuthController = class AuthController {
    async login(body, userAgent, ip, response) {
        if (!userAgent) {
            userAgent = 'default agent';
        }
        const creds = {
            loginOrEmail: body.loginOrEmail,
            password: body.password,
            ip: ip ? ip : '',
            title: userAgent
        };
        const { accessToken, refreshToken } = await this.commandBus.execute(new _loginuserusecase.LoginUserCommand(creds.loginOrEmail, creds.password, creds.ip, creds.title));
        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: this.configService.secureCookie
        }).send({
            accessToken
        });
    }
    async reissueTokens(req, res) {
        const token = req.cookies.refreshToken;
        const { refreshToken, accessToken } = await this.commandBus.execute(new _reissuetokensusecase.ReissueTokensCommand(token));
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: this.configService.secureCookie
        }).send({
            accessToken
        });
    }
    async logout(req, res) {
        const token = req.cookies.refreshToken;
        await this.commandBus.execute(new _logoutuserusecase.LogoutCommand(token));
        res.clearCookie('refreshToken').send();
    }
    async getUserInfo(user) {
        return this.queryBus.execute(new _getuserinfoquery.GetUserInfoQuery(user.userId));
    }
    async registerUser(body) {
        return this.commandBus.execute(new _registeruserusecase.RegisterUserCommand(body.login, body.password, body.email));
    }
    async resendEmailConfirmation(dto) {
        return this.commandBus.execute(new _resendemailconfirmationusecase.ResendEmailConfirmationCommand(dto.email));
    }
    async confirmEmail(dto) {
        return this.commandBus.execute(new _confirmuseremailusecase.ConfirmUserEmailCommand(dto.code));
    }
    async recoverPassword(dto) {
        return this.commandBus.execute(new _recoverpasswordusecase.RecoverPasswordCommand(dto.email));
    }
    async confirmPassword(dto) {
        return this.commandBus.execute(new _confirmnewpasswordusecase.ConfirmPasswordCommand(dto.recoveryCode, dto.newPassword));
    }
    constructor(configService, queryBus, commandBus){
        this.configService = configService;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
};
_ts_decorate([
    (0, _common.Post)('login'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Headers)('user-agent')),
    _ts_param(2, (0, _common.Ip)()),
    _ts_param(3, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userlogindto.UserLoginInputDto === "undefined" ? Object : _userlogindto.UserLoginInputDto,
        String,
        String,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtrefreshtokenguard.RefreshTokenGuard),
    (0, _throttler.SkipThrottle)(),
    (0, _common.Post)('refresh-token'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "reissueTokens", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtrefreshtokenguard.RefreshTokenGuard),
    (0, _throttler.SkipThrottle)(),
    (0, _common.Post)('logout'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _throttler.SkipThrottle)(),
    (0, _common.Get)('me'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getUserInfo", null);
_ts_decorate([
    (0, _common.Post)('registration'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _registeruserinputdto.RegisterUserInputDto === "undefined" ? Object : _registeruserinputdto.RegisterUserInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
_ts_decorate([
    (0, _common.Post)('registration-email-resending'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _resendemailinputdto.ResendEmailConfirmationInputDto === "undefined" ? Object : _resendemailinputdto.ResendEmailConfirmationInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmailConfirmation", null);
_ts_decorate([
    (0, _common.Post)('registration-confirmation'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailconfirminputdto.ConfirmEmailInputDto === "undefined" ? Object : _emailconfirminputdto.ConfirmEmailInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
_ts_decorate([
    (0, _common.Post)('password-recovery'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _passrecoverinputdto.PassRecoverInputDto === "undefined" ? Object : _passrecoverinputdto.PassRecoverInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "recoverPassword", null);
_ts_decorate([
    (0, _common.Post)('new-password'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _passconfirminputdto.ConfirmPasswordInputDto === "undefined" ? Object : _passconfirminputdto.ConfirmPasswordInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPassword", null);
AuthController = _ts_decorate([
    (0, _common.UseGuards)(_throttler.ThrottlerGuard),
    (0, _common.Controller)('auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig,
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus,
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map