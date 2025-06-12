"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailTemplates", {
    enumerable: true,
    get: function() {
        return EmailTemplates;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EmailTemplates = class EmailTemplates {
    generateRegistrationEmail(code) {
        return ` <h1>Thank for your registration</h1>
               <p>To finish registration please follow the link below:<br>
                  <a href='https://${this.configService.get('confirmationCodesDomain')}/confirm-email?code=${code}'>complete registration</a>
              </p>`;
    }
    generatePassRecoveryEmail(code) {
        return `<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://${this.configService.get('confirmationCodesDomain')}/password-recovery?recoveryCode=${code}'>recovery password</a>
      </p>`;
    }
    constructor(configService){
        this.configService = configService;
    }
};
EmailTemplates = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], EmailTemplates);

//# sourceMappingURL=email.templates.js.map