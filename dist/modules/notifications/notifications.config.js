"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationsConfig", {
    enumerable: true,
    get: function() {
        return NotificationsConfig;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _classvalidator = require("class-validator");
const _configvalidationutility = require("../../setup/config-validation.utility");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NotificationsConfig = class NotificationsConfig {
    constructor(configService){
        this.configService = configService;
        this.mailerHost = this.configService.get('EMAIL_HOST');
        this.mailerLogin = this.configService.get('EMAIL');
        this.mailerPass = this.configService.get('EMAIL_PASS');
        _configvalidationutility.configValidationUtility.validateConfig(this);
    }
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set env variable EMAIL_HOST'
    }),
    _ts_metadata("design:type", String)
], NotificationsConfig.prototype, "mailerHost", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set env variable EMAIL'
    }),
    _ts_metadata("design:type", String)
], NotificationsConfig.prototype, "mailerLogin", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Set env variable EMAIL_PASS'
    }),
    _ts_metadata("design:type", String)
], NotificationsConfig.prototype, "mailerPass", void 0);
NotificationsConfig = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], NotificationsConfig);

//# sourceMappingURL=notifications.config.js.map