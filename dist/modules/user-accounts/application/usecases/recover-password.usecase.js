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
    get RecoverPasswordCommand () {
        return RecoverPasswordCommand;
    },
    get RecoverPasswordHandler () {
        return RecoverPasswordHandler;
    }
});
const _mailer = require("@nestjs-modules/mailer");
const _cqrs = require("@nestjs/cqrs");
const _emailtemplates = require("../../../notifications/email.templates");
const _usersrepository = require("../../infrastructure/users.repository");
const _luxon = require("luxon");
const _useraccountconfig = require("../../config/user-account.config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RecoverPasswordCommand = class RecoverPasswordCommand {
    constructor(email){
        this.email = email;
    }
};
let RecoverPasswordHandler = class RecoverPasswordHandler {
    async execute(command) {
        const user = await this.usersRepository.findUserByEmail(command.email);
        if (!user) {
            return null;
        }
        const expiration = _luxon.Duration.fromObject({
            minutes: this.configService.passRecoveryExpiration
        });
        user.genPasswordRecovery(expiration);
        const emailTemplate = this.templateFactory.generatePassRecoveryEmail(this.configService.confirmationCodesDomain, user.passwordRecovery.confirmationCode);
        this.mailerService.sendMail({
            to: command.email,
            subject: 'Blogs service password recovery request',
            html: emailTemplate
        }).catch((err)=>console.error(`Error sending email: ${err}`));
        await this.usersRepository.save(user);
        return;
    }
    constructor(usersRepository, mailerService, templateFactory, configService){
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
        this.templateFactory = templateFactory;
        this.configService = configService;
    }
};
RecoverPasswordHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(RecoverPasswordCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService,
        typeof _emailtemplates.EmailTemplates === "undefined" ? Object : _emailtemplates.EmailTemplates,
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig
    ])
], RecoverPasswordHandler);

//# sourceMappingURL=recover-password.usecase.js.map