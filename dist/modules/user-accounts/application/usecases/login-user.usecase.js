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
    get LoginUserCommand () {
        return LoginUserCommand;
    },
    get LoginUserHandler () {
        return LoginUserHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _usersrepository = require("../../infrastructure/users.repository");
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _luxon = require("luxon");
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _authtokeninjectconstants = require("../../constants/auth-token.inject-constants");
const _passHashservice = require("../passHash.service");
const _devicessecurityrepository = require("../../infrastructure/devices-security.repository");
const _mongoose1 = require("@nestjs/mongoose");
const _sessionentity = require("../../domain/session.entity");
const _useraccountconfig = require("../../config/user-account.config");
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
let LoginUserCommand = class LoginUserCommand {
    constructor(loginOrEmail, password, ip, title){
        this.loginOrEmail = loginOrEmail;
        this.password = password;
        this.ip = ip;
        this.title = title;
    }
};
let LoginUserHandler = class LoginUserHandler {
    async execute(command) {
        const user = await this.usersRepository.findUserByLoginOrEmail(command.loginOrEmail);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Wrong login or password'
            });
        }
        await this.checkPass(command.password, user.passwordHash);
        const rtInput = {
            userId: user._id.toString(),
            deviceId: new _mongoose.default.Types.ObjectId().toString(),
            iat: Math.floor(_luxon.DateTime.utc().toSeconds())
        };
        const accTInput = {
            id: user._id.toString()
        };
        const accessToken = this.jwtAccesTokService.sign(accTInput);
        const refreshToken = this.jwtRefreshTokService.sign(rtInput);
        const sessionInput = {
            deviceId: rtInput.deviceId,
            userId: rtInput.userId,
            iat: rtInput.iat,
            ip: command.ip,
            title: command.title
        };
        await this.saveSession(sessionInput);
        return {
            accessToken,
            refreshToken
        };
    }
    async checkPass(inputPassword, passHash) {
        const isValidPass = await this.passHashService.compareHash(inputPassword, passHash);
        if (!isValidPass) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
                message: 'Wrong login or password'
            });
        }
    }
    async saveSession(input) {
        const domainInput = {
            ...input,
            deviceId: new _mongoose.default.Types.ObjectId(input.deviceId),
            expiration: _luxon.DateTime.utc().plus(_luxon.Duration.fromMillis(this.configService.refreshTokenDuration * 1000)).toJSDate()
        };
        const session = this.SessionModel.createSession(domainInput);
        await this.sessionsRepository.save(session);
        return;
    }
    constructor(usersRepository, passHashService, jwtAccesTokService, jwtRefreshTokService, SessionModel, sessionsRepository, configService){
        this.usersRepository = usersRepository;
        this.passHashService = passHashService;
        this.jwtAccesTokService = jwtAccesTokService;
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.SessionModel = SessionModel;
        this.sessionsRepository = sessionsRepository;
        this.configService = configService;
    }
};
LoginUserHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(LoginUserCommand),
    _ts_param(2, (0, _common.Inject)(_authtokeninjectconstants.ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_param(3, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_param(4, (0, _mongoose1.InjectModel)(_sessionentity.DeviceAuthSession.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _passHashservice.HashService === "undefined" ? Object : _passHashservice.HashService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _sessionentity.SessionModelType === "undefined" ? Object : _sessionentity.SessionModelType,
        typeof _devicessecurityrepository.DevicesSecurityRepository === "undefined" ? Object : _devicessecurityrepository.DevicesSecurityRepository,
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig
    ])
], LoginUserHandler);

//# sourceMappingURL=login-user.usecase.js.map