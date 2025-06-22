"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserAccountConfig", {
    enumerable: true,
    get: function() {
        return UserAccountConfig;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _classvalidator = require("class-validator");
const _configvalidationutility = require("../../../setup/config-validation.utility");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserAccountConfig = class UserAccountConfig {
    constructor(configService){
        this.configService = configService;
        this.adminUsername = this.configService.get('ADMIN_USERNAME');
        this.adminPassword = this.configService.get('ADMIN_PASSWORD');
        this.jwtAccessSecret = this.configService.get('JWT_ACCESS_TOKEN_SECRET');
        this.accessTokenDuration = Number(this.configService.get('JWT_EXP_TIME_IN_SECONDS'));
        this.jwtRefreshSecret = this.configService.get('JWT_REFRESH_TOKEN_SECRET');
        this.refreshTokenDuration = Number(this.configService.get('REFRESHT_TIME_IN_SECONDS'));
        this.confirmationCodesDomain = this.configService.get('CONFIRMATION_CODES_DOMAIN');
        this.passRecoveryExpiration = Number(this.configService.get('PASS_RECOVERY_EXPIRATION_IN_MINUTES'));
        this.emailExpiration = Number(this.configService.get('EMAIL_RECOVERY_EXPIRATION_IN_MINUTES'));
        this.secureCookie = _configvalidationutility.configValidationUtility.convertToBoolean(this.configService.get('SECURE_REFRESHTOKEN_COOKIE'));
        _configvalidationutility.configValidationUtility.validateConfig(this);
    }
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable ADMIN_USERNAME'
    }),
    _ts_metadata("design:type", String)
], UserAccountConfig.prototype, "adminUsername", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable ADMIN_PASSWORD'
    }),
    _ts_metadata("design:type", String)
], UserAccountConfig.prototype, "adminPassword", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable JWT_ACCESS_TOKEN_SECRET to any secure string'
    }),
    _ts_metadata("design:type", String)
], UserAccountConfig.prototype, "jwtAccessSecret", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set JWT_EXP_TIME_IN_SECONDS env variable, example: 10'
    }),
    _ts_metadata("design:type", Number)
], UserAccountConfig.prototype, "accessTokenDuration", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set Env variable JWT_REFRESH_TOKEN_SECRET to any secure string'
    }),
    _ts_metadata("design:type", String)
], UserAccountConfig.prototype, "jwtRefreshSecret", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set REFRESHT_TIME_IN_SECONDS env variable, example: 20'
    }),
    _ts_metadata("design:type", Number)
], UserAccountConfig.prototype, "refreshTokenDuration", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set env variable CONFIRMATION_CODES_DOMAIN to a valid domain name of the app, example: blogs-nest-itinc.vercel.app'
    }),
    _ts_metadata("design:type", String)
], UserAccountConfig.prototype, "confirmationCodesDomain", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set PASS_RECOVERY_EXPIRATION_IN_MINUTES env variable, example: 10'
    }),
    _ts_metadata("design:type", Number)
], UserAccountConfig.prototype, "passRecoveryExpiration", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Set EMAIL_RECOVERY_EXPIRATION_IN_MINUTES env variable, example: 10'
    }),
    _ts_metadata("design:type", Number)
], UserAccountConfig.prototype, "emailExpiration", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Set env variable SECURE_REFRESHTOKEN_COOKIE to enable/disable secure cookie, example: true/false'
    })
], UserAccountConfig.prototype, "secureCookie", void 0);
UserAccountConfig = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], UserAccountConfig);

//# sourceMappingURL=user-account.config.js.map