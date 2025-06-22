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
    get RegisterUserCommand () {
        return RegisterUserCommand;
    },
    get RegisterUserHandler () {
        return RegisterUserHandler;
    }
});
const _mailer = require("@nestjs-modules/mailer");
const _cqrs = require("@nestjs/cqrs");
const _emailtemplates = require("../../../notifications/email.templates");
const _usersservice = require("../users.service");
const _luxon = require("luxon");
const _usersrepository = require("../../infrastructure/users.repository");
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
let RegisterUserCommand = class RegisterUserCommand {
    constructor(login, password, email){
        this.login = login;
        this.password = password;
        this.email = email;
    }
};
let RegisterUserHandler = class RegisterUserHandler {
    async execute(command) {
        const user = await this.usersService.createUserDoc(command);
        const expiration = _luxon.Duration.fromObject({
            minutes: this.configService.emailExpiration
        });
        user.genEmailConfirmation(expiration);
        const email = this.templateFactory.generateRegistrationEmail(this.configService.confirmationCodesDomain, user.emailConfirmation.confirmationCode);
        this.mailerService.sendMail({
            to: user.email,
            subject: 'Bloggers platform registration',
            html: email
        }).catch((err)=>console.error(`error sending email: ${err}`));
        await this.usersRepository.save(user);
    }
    constructor(usersService, usersRepository, mailerService, templateFactory, configService){
        this.usersService = usersService;
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
        this.templateFactory = templateFactory;
        this.configService = configService;
    }
};
RegisterUserHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(RegisterUserCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService,
        typeof _emailtemplates.EmailTemplates === "undefined" ? Object : _emailtemplates.EmailTemplates,
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig
    ])
], RegisterUserHandler);

//# sourceMappingURL=register-user.usecase.js.map