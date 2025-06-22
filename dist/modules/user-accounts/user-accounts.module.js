"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserAccountsModule", {
    enumerable: true,
    get: function() {
        return UserAccountsModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("./domain/user.entity");
const _userscontroller = require("./api/users.controller");
const _usersservice = require("./application/users.service");
const _usersrepository = require("./infrastructure/users.repository");
const _basicauthguard = require("./guards/basic/basic-auth.guard");
const _passHashservice = require("./application/passHash.service");
const _jwt = require("@nestjs/jwt");
const _sessionentity = require("./domain/session.entity");
const _authcontroller = require("./api/auth.controller");
const _devicessecuritycontroller = require("./api/devices-security.controller");
const _jwtauthguard = require("./guards/bearer/jwt-auth.guard");
const _jwtrefreshtokenguard = require("./guards/bearer/jwt-refresh-token-guard");
const _emailtemplates = require("../notifications/email.templates");
const _notificationsmodule = require("../notifications/notifications.module");
const _devicessecurityrepository = require("./infrastructure/devices-security.repository");
const _authtokeninjectconstants = require("./constants/auth-token.inject-constants");
const _usersexternalservice = require("./application/users.external-service");
const _jwtstrategy = require("./guards/bearer/jwt.strategy");
const _apiRequestentity = require("./domain/apiRequest.entity");
const _apiRequestsrepository = require("./infrastructure/apiRequests.repository");
const _getallusersquery = require("./application/queries/get-all-users.query");
const _getuserinfoquery = require("./application/queries/get-user-info.query");
const _getuserquery = require("./application/queries/get-user.query");
const _createuserusecase = require("./application/usecases/create-user.usecase");
const _deleteuserusecase = require("./application/usecases/delete-user.usecase");
const _registeruserusecase = require("./application/usecases/register-user.usecase");
const _resendemailconfirmationusecase = require("./application/usecases/resend-email-confirmation.usecase");
const _loginuserusecase = require("./application/usecases/login-user.usecase");
const _confirmuseremailusecase = require("./application/usecases/confirm-user-email.usecase");
const _reissuetokensusecase = require("./application/usecases/reissue-tokens.usecase");
const _recoverpasswordusecase = require("./application/usecases/recover-password.usecase");
const _confirmnewpasswordusecase = require("./application/usecases/confirm-new-password.usecase");
const _logoutuserusecase = require("./application/usecases/logout-user.usecase");
const _logoutanothersessionusecase = require("./application/usecases/logout-another-session.usecase");
const _logoutallothersessionsusecase = require("./application/usecases/logout-all-other-sessions.usecase");
const _useraccountconfig = require("./config/user-account.config");
const _getallusersessionsquery = require("./application/queries/get-all-user-sessions.query");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const queries = [
    _getallusersquery.GetAllUsersQueryHandler,
    _getuserinfoquery.GetUserInfoQueryHandler,
    _getuserquery.GetUserQueryHandler,
    _getallusersessionsquery.GetUserSessionsQueryHandler
];
const useCases = [
    _createuserusecase.CreateUserByAdminHandler,
    _deleteuserusecase.DeleteUserHandler,
    _registeruserusecase.RegisterUserHandler,
    _resendemailconfirmationusecase.ResendEmailConfirmationHandler,
    _loginuserusecase.LoginUserHandler,
    _confirmuseremailusecase.ConfirmUserEmailHandler,
    _reissuetokensusecase.ReissueTokensHandler,
    _recoverpasswordusecase.RecoverPasswordHandler,
    _confirmnewpasswordusecase.ConfirmPasswordHandler,
    _logoutuserusecase.LogoutCommandHandler,
    _logoutanothersessionusecase.LogoutAnotherSessionHandler,
    _logoutallothersessionsusecase.LogoutOtherSessionHandler
];
let UserAccountsModule = class UserAccountsModule {
};
UserAccountsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwt.JwtModule.register({}),
            _notificationsmodule.NotificationsModule,
            _mongoose.MongooseModule.forFeature([
                {
                    name: _userentity.User.name,
                    schema: _userentity.UserSchema
                }
            ]),
            _mongoose.MongooseModule.forFeature([
                {
                    name: _sessionentity.DeviceAuthSession.name,
                    schema: _sessionentity.SessionSchema
                }
            ]),
            _mongoose.MongooseModule.forFeature([
                {
                    name: _apiRequestentity.ApiRequest.name,
                    schema: _apiRequestentity.ApiRequestSchema
                }
            ])
        ],
        controllers: [
            _userscontroller.UsersController,
            _authcontroller.AuthController,
            _devicessecuritycontroller.DevicesSecurityController
        ],
        providers: [
            _useraccountconfig.UserAccountConfig,
            {
                provide: _authtokeninjectconstants.ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
                useFactory: (configService)=>{
                    return new _jwt.JwtService({
                        secret: configService.jwtAccessSecret,
                        signOptions: {
                            expiresIn: `${configService.accessTokenDuration}s`
                        }
                    });
                },
                inject: [
                    _useraccountconfig.UserAccountConfig
                ]
            },
            {
                provide: _authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
                useFactory: (configService)=>{
                    return new _jwt.JwtService({
                        secret: configService.jwtRefreshSecret,
                        signOptions: {
                            expiresIn: `${configService.refreshTokenDuration}s`
                        }
                    });
                },
                inject: [
                    _useraccountconfig.UserAccountConfig
                ]
            },
            _usersservice.UsersService,
            _usersexternalservice.UsersExternalService,
            _usersrepository.UsersRepository,
            _basicauthguard.BasicAuthGuard,
            _jwtauthguard.JwtAuthGuard,
            _jwtstrategy.JwtStrategy,
            _jwtrefreshtokenguard.RefreshTokenGuard,
            _passHashservice.HashService,
            _emailtemplates.EmailTemplates,
            _devicessecurityrepository.DevicesSecurityRepository,
            _apiRequestsrepository.ApiRequestsStorage,
            ...queries,
            ...useCases
        ],
        exports: [
            _basicauthguard.BasicAuthGuard,
            _jwtauthguard.JwtAuthGuard,
            _usersexternalservice.UsersExternalService,
            _apiRequestsrepository.ApiRequestsStorage,
            _useraccountconfig.UserAccountConfig
        ]
    })
], UserAccountsModule);

//# sourceMappingURL=user-accounts.module.js.map