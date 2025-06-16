"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _jwt = require("@nestjs/jwt");
const _passHashservice = require("./passHash.service");
const _usersservice = require("./users.service");
const _mailer = require("@nestjs-modules/mailer");
const _emailtemplates = require("../../notifications/email.templates");
const _common = require("@nestjs/common");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _devicessecurityservice = require("./devices-security.service");
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
let AuthService = class AuthService {
    async checkCredentials(credentials) {
        const user = await this.usersService.getUserByLoginOrEmail(credentials.loginOrEmail);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Wrong login or password'
            });
        }
        const isValidPass = await this.passHashService.compareHash(credentials.password, user.passwordHash);
        if (!isValidPass) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Wrong login or password'
            });
        }
        const rtInput = {
            userId: user._id.toString(),
            deviceId: new _mongoose.default.Types.ObjectId().toString(),
            iat: new Date().getTime()
        };
        const accTInput = {
            id: user._id.toString()
        };
        const accessToken = this.jwtAccesTokService.sign(accTInput);
        const refreshToken = this.jwtRefreshTokService.sign(rtInput);
        const sessionInput = {
            deviceId: rtInput.deviceId,
            userId: rtInput.userId,
            iat: new Date(rtInput.iat),
            ip: credentials.ip,
            title: credentials.title
        };
        await this.sessionsService.saveSession(sessionInput);
        return {
            accessToken,
            refreshToken
        };
    }
    async registerUser(newUserDto) {
        const { userId } = await this.usersService.createUser(newUserDto);
        const user = await this.usersService.findUserById(userId);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'Failed to create a new user entry'
            });
        }
        const emailConfirmation = await this.usersService.createEmailConfirmation(user.email);
        const email = this.templateFactory.generateRegistrationEmail(emailConfirmation.confirmationCode);
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Bloggers platform registration',
            html: email
        });
        // .catch((err) => console.error(`error sending email: ${err}`));
        return {
            userId
        };
    }
    async confirmEmail(code) {
        const confirmationCode = code;
        await this.usersService.confirmEmail(confirmationCode);
        return;
    }
    async resendConfirmation(email) {
        const newConfirmation = await this.usersService.createEmailConfirmation(email);
        const emailTemplate = this.templateFactory.generateRegistrationEmail(newConfirmation.confirmationCode);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Bloggers platform registration',
            html: emailTemplate
        });
        // .catch((err) => console.error(`error sending email: ${err}`));
        return;
    }
    async reissueTokensPair(token) {
        const payload = this.jwtRefreshTokService.decode(token);
        await this.sessionsService.getSession(payload.deviceId, payload.iat);
        const rtInput = {
            userId: payload.userId,
            deviceId: new _mongoose.default.Types.ObjectId().toString(),
            iat: new Date().getTime()
        };
        const refreshToken = this.jwtRefreshTokService.sign(rtInput);
        const accessToken = this.jwtAccesTokService.sign({
            id: payload.userId
        });
        await this.sessionsService.refreshSession(payload.deviceId, rtInput.iat);
        return {
            accessToken,
            refreshToken
        };
    }
    async recoverPassword(email) {
        const recoveryObj = await this.usersService.setPasswordRecovery(email);
        if (!recoveryObj) {
            return;
        }
        const emailTemplate = this.templateFactory.generatePassRecoveryEmail(recoveryObj.confirmationCode);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Blogs service password recovery request',
            html: emailTemplate
        });
        // .catch((err) => console.error(`Error sending email: ${err}`));
        return;
    }
    async confirmPassword(input) {
        await this.usersService.confirmPassword(input);
    }
    constructor(usersService, passHashService, jwtAccesTokService, jwtRefreshTokService, sessionsService, mailerService, templateFactory){
        this.usersService = usersService;
        this.passHashService = passHashService;
        this.jwtAccesTokService = jwtAccesTokService;
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.sessionsService = sessionsService;
        this.mailerService = mailerService;
        this.templateFactory = templateFactory;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _common.Inject)(_authtokeninjectconstants.ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_param(3, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _passHashservice.HashService === "undefined" ? Object : _passHashservice.HashService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _devicessecurityservice.SessionsService === "undefined" ? Object : _devicessecurityservice.SessionsService,
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService,
        typeof _emailtemplates.EmailTemplates === "undefined" ? Object : _emailtemplates.EmailTemplates
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map