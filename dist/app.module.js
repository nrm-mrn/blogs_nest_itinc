"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _mongoose = require("@nestjs/mongoose");
const _configmodule = /*#__PURE__*/ _interop_require_default(require("./modules/config/config.module"));
const _bloggersplatformmodule = require("./modules/bloggers-platform/bloggers-platform.module");
const _core = require("@nestjs/core");
const _allexceptionsfilter = require("./core/exceptions/filters/all-exceptions.filter");
const _domainexceptionfilter = require("./core/exceptions/filters/domain-exception.filter");
const _useraccountsmodule = require("./modules/user-accounts/user-accounts.module");
const _testingAPImodule = require("./testing/testingAPI.module");
const _notificationsmodule = require("./modules/notifications/notifications.module");
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
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                load: [
                    _configmodule.default
                ],
                isGlobal: true
            }),
            _mongoose.MongooseModule.forRootAsync({
                imports: [
                    _config.ConfigModule
                ],
                useFactory: (configService)=>({
                        uri: configService.get('dbURL'),
                        dbName: configService.get('dbName')
                    }),
                inject: [
                    _config.ConfigService
                ]
            }),
            _bloggersplatformmodule.BloggersPlatformModule,
            _useraccountsmodule.UserAccountsModule,
            _notificationsmodule.NotificationsModule,
            _config.ConditionalModule.registerWhen(_testingAPImodule.TestingApiModule, (env)=>env.NODE_ENV === 'testing')
        ],
        controllers: [],
        providers: [
            {
                provide: _core.APP_FILTER,
                useClass: _allexceptionsfilter.AllExceptionFilter
            },
            {
                provide: _core.APP_FILTER,
                useClass: _domainexceptionfilter.DomainHttpExceptionFilter
            }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map