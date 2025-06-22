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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailTemplates = class EmailTemplates {
    generateRegistrationEmail(domain, code) {
        return ` <h1>Thank for your registration</h1>
               <p>To finish registration please follow the link below:<br>
                  <a href='https://${domain}/confirm-email?code=${code}'>complete registration</a>
              </p>`;
    }
    generatePassRecoveryEmail(domain, code) {
        return `<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://${domain}/password-recovery?recoveryCode=${code}'>recovery password</a>
      </p>`;
    }
};
EmailTemplates = _ts_decorate([
    (0, _common.Injectable)()
], EmailTemplates);

//# sourceMappingURL=email.templates.js.map