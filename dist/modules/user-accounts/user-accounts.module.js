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
const _usersqueryrepository = require("./infrastructure/query/users.query-repository");
const _usersrepository = require("./infrastructure/users.repository");
const _basicauthguard = require("./guards/basic/basic-auth.guard");
const _passHashservice = require("./application/passHash.service");
const _jwt = require("@nestjs/jwt");
const _config = require("@nestjs/config");
const _sessionentity = require("./domain/session.entity");
const _authcontroller = require("./api/auth.controller");
const _devicessecuritycontroller = require("./api/devices-security.controller");
const _jwtauthguard = require("./guards/bearer/jwt-auth.guard");
const _jwtrefreshtokenguard = require("./guards/bearer/jwt-refresh-token-guard");
const _emailtemplates = require("../notifications/email.templates");
const _emailservice = require("../notifications/email.service");
const _authservice = require("./application/auth.service");
const _devicessecurityservice = require("./application/devices-security.service");
const _notificationsmodule = require("../notifications/notifications.module");
const _devicessecurityrepository = require("./infrastructure/devices-security.repository");
const _devicessecurityqueryrepository = require("./infrastructure/query/devices-security.query-repository");
const _authtokeninjectconstants = require("./constants/auth-token.inject-constants");
const _usersexternalservice = require("./application/users.external-service");
const _jwtstrategy = require("./guards/bearer/jwt.strategy");
const _apiRequestentity = require("./domain/apiRequest.entity");
const _apiRequestsrepository = require("./infrastructure/apiRequests.repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
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
            {
                provide: _authtokeninjectconstants.ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
                useFactory: (configService)=>{
                    return new _jwt.JwtService({
                        secret: configService.get('jwtAccessSecret'),
                        signOptions: {
                            expiresIn: `${configService.get('accessTokenDuration')}s`
                        }
                    });
                },
                inject: [
                    _config.ConfigService
                ]
            },
            {
                provide: _authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
                useFactory: (configService)=>{
                    return new _jwt.JwtService({
                        secret: configService.get('jwtRefreshSecret'),
                        signOptions: {
                            expiresIn: `${configService.get('refreshTokenDuration')}s`
                        }
                    });
                },
                inject: [
                    _config.ConfigService
                ]
            },
            _usersservice.UsersService,
            _usersexternalservice.UsersExternalService,
            _usersqueryrepository.UsersQueryRepository,
            _usersrepository.UsersRepository,
            _basicauthguard.BasicAuthGuard,
            _jwtauthguard.JwtAuthGuard,
            _jwtstrategy.JwtStrategy,
            _jwtrefreshtokenguard.RefreshTokenGuard,
            _passHashservice.HashService,
            _emailtemplates.EmailTemplates,
            _emailservice.EmailService,
            _authservice.AuthService,
            _devicessecurityservice.SessionsService,
            _devicessecurityrepository.DevicesSecurityRepository,
            _devicessecurityqueryrepository.SessionsQueryRepository,
            _apiRequestsrepository.ApiRequestsStorage
        ],
        exports: [
            _basicauthguard.BasicAuthGuard,
            _jwtauthguard.JwtAuthGuard,
            _usersexternalservice.UsersExternalService,
            _apiRequestsrepository.ApiRequestsStorage
        ]
    })
], UserAccountsModule);

//# sourceMappingURL=user-accounts.module.js.map