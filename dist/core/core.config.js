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
    get CoreConfig () {
        return CoreConfig;
    },
    get Environments () {
        return Environments;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _classvalidator = require("class-validator");
const _configvalidationutility = require("../setup/config-validation.utility");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var Environments = /*#__PURE__*/ function(Environments) {
    Environments["DEVELOPMENT"] = "development";
    Environments["STAGING"] = "staging";
    Environments["PRODUCTION"] = "production";
    Environments["TESTING"] = "testing";
    return Environments;
}({});
let CoreConfig = class CoreConfig {
    constructor(configService){
        this.configService = configService;
        this.port = Number(this.configService.get('PORT'));
        this.nodeEnv = this.configService.get('NODE_ENV');
        this.mongoURI = this.configService.get('DB_URL');
        this.dbName = this.configService.get('DB_NAME');
        this.isSwaggerEnabled = _configvalidationutility.configValidationUtility.convertToBoolean(this.configService.get('IS_SWAGGER_ENABLED'));
        this.verboseErrors = _configvalidationutility.configValidationUtility.convertToBoolean(this.configService.get('VERBOSE_ERRORS'));
        this.requestsTTL = Number(this.configService.get('THROTTLER_REQUESTS_TTL_IN_MS'));
        this.requestsLimit = Number(this.configService.get('THROTTLER_REQUESTS_LIMIT'));
        this.includeTestingModule = _configvalidationutility.configValidationUtility.convertToBoolean(this.configService.get('INCLUDE_TESTING_MODULE'));
        _configvalidationutility.configValidationUtility.validateConfig(this);
    }
};
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set env variable PORT'
    }),
    _ts_metadata("design:type", Number)
], CoreConfig.prototype, "port", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(Environments, {
        message: 'Set correct NODE_ENV value, available values: ' + _configvalidationutility.configValidationUtility.getEnumValues(Environments).join(', ')
    }),
    _ts_metadata("design:type", String)
], CoreConfig.prototype, "nodeEnv", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable DB_URL to a valid mongodb connection string'
    }),
    _ts_metadata("design:type", String)
], CoreConfig.prototype, "mongoURI", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable DB_URL to a valid mongodb connection string'
    }),
    _ts_metadata("design:type", String)
], CoreConfig.prototype, "dbName", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Set env variable IS_SWAGGER_ENABLED to enable/disable swagger, example: true/false'
    })
], CoreConfig.prototype, "isSwaggerEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Set env variable VERBOSE_ERRORS to enable/disable detailed error messages returned to frontend'
    })
], CoreConfig.prototype, "verboseErrors", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set env variable THROTTLER_REQUESTS_TTL_IN_MS to limit number of allowed requests in a given timeframe'
    }),
    _ts_metadata("design:type", Number)
], CoreConfig.prototype, "requestsTTL", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set env variable THROTTLER_REQUESTS_LIMIT to limit number of allowed requests in a given timeframe'
    }),
    _ts_metadata("design:type", Number)
], CoreConfig.prototype, "requestsLimit", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Set env variable INCLUDE_TESTING_MODULE to enable/disable testing module in the app'
    })
], CoreConfig.prototype, "includeTestingModule", void 0);
CoreConfig = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], CoreConfig);

//# sourceMappingURL=core.config.js.map