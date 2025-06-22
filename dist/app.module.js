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
const _configdynamicmodule = require("./config-dynamic-module");
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _bloggersplatformmodule = require("./modules/bloggers-platform/bloggers-platform.module");
const _core = require("@nestjs/core");
const _allexceptionsfilter = require("./core/exceptions/filters/all-exceptions.filter");
const _domainexceptionfilter = require("./core/exceptions/filters/domain-exception.filter");
const _useraccountsmodule = require("./modules/user-accounts/user-accounts.module");
const _testingAPImodule = require("./testing/testingAPI.module");
const _notificationsmodule = require("./modules/notifications/notifications.module");
const _throttler = require("@nestjs/throttler");
const _throttlerexceptionsfilter = require("./core/exceptions/filters/throttler-exceptions.filter");
const _apiRequestsrepository = require("./modules/user-accounts/infrastructure/apiRequests.repository");
const _coreconfig = require("./core/core.config");
const _coremodule = require("./core/core.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
    static async forRoot(coreConfig) {
        return {
            module: AppModule,
            imports: [
                ...coreConfig.includeTestingModule ? [
                    _testingAPImodule.TestingApiModule
                ] : []
            ]
        };
    }
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _configdynamicmodule.configModule,
            _coremodule.CoreModule,
            _mongoose.MongooseModule.forRootAsync({
                useFactory: (configService)=>({
                        uri: configService.mongoURI,
                        dbName: configService.dbName
                    }),
                inject: [
                    _coreconfig.CoreConfig
                ]
            }),
            _throttler.ThrottlerModule.forRootAsync({
                imports: [
                    _useraccountsmodule.UserAccountsModule
                ],
                useFactory: (configService, storage)=>({
                        throttlers: [
                            {
                                ttl: configService.requestsTTL,
                                limit: configService.requestsLimit
                            }
                        ],
                        storage
                    }),
                inject: [
                    _coreconfig.CoreConfig,
                    _apiRequestsrepository.ApiRequestsStorage
                ]
            }),
            _bloggersplatformmodule.BloggersPlatformModule,
            _useraccountsmodule.UserAccountsModule,
            _notificationsmodule.NotificationsModule
        ],
        controllers: [],
        providers: [
            {
                provide: _core.APP_FILTER,
                useClass: _allexceptionsfilter.AllExceptionFilter
            },
            {
                provide: _core.APP_FILTER,
                useClass: _throttlerexceptionsfilter.ThrottlerExceptionFilter
            },
            {
                provide: _core.APP_FILTER,
                useClass: _domainexceptionfilter.DomainHttpExceptionFilter
            }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map