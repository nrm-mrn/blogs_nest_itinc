"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailService", {
    enumerable: true,
    get: function() {
        return EmailService;
    }
});
const _mailer = require("@nestjs-modules/mailer");
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EmailService = class EmailService {
    async sendEmail(email, template) {
        await this.mailerService.sendMail({
            from: 'blogsmailerserv@mail.ru',
            to: email,
            subject: 'Email confirmation',
            html: template
        });
    }
    constructor(mailerService){
        this.mailerService = mailerService;
    }
};
EmailService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService
    ])
], EmailService);

//# sourceMappingURL=email.service.js.map