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
    get ResendEmailConfirmationCommand () {
        return ResendEmailConfirmationCommand;
    },
    get ResendEmailConfirmationHandler () {
        return ResendEmailConfirmationHandler;
    }
});
const _mailer = require("@nestjs-modules/mailer");
const _cqrs = require("@nestjs/cqrs");
const _emailtemplates = require("../../../notifications/email.templates");
const _usersrepository = require("../../infrastructure/users.repository");
const _luxon = require("luxon");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
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
let ResendEmailConfirmationCommand = class ResendEmailConfirmationCommand {
    constructor(email){
        this.email = email;
    }
};
let ResendEmailConfirmationHandler = class ResendEmailConfirmationHandler {
    async execute(command) {
        const user = await this.usersRepository.findUserByEmail(command.email);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'User with provided email do not exist',
                extensions: [
                    new _domainexceptions.Extension('User with provided email do not exist', 'email')
                ]
            });
        }
        if (user.emailConfirmation?.isConfirmed) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Email is already confirmed',
                extensions: [
                    new _domainexceptions.Extension('Email is already confirmed', 'email')
                ]
            });
        }
        const expiration = _luxon.Duration.fromObject({
            minutes: this.configService.emailExpiration
        });
        user.genEmailConfirmation(expiration);
        const emailTemplate = this.templateFactory.generateRegistrationEmail(this.configService.confirmationCodesDomain, user.emailConfirmation.confirmationCode);
        this.mailerService.sendMail({
            to: user.email,
            subject: 'Bloggers platform registration',
            html: emailTemplate
        }).catch((err)=>console.error(`error sending email: ${err}`));
        await this.usersRepository.save(user);
        return;
    }
    constructor(usersRepository, configService, mailerService, templateFactory){
        this.usersRepository = usersRepository;
        this.configService = configService;
        this.mailerService = mailerService;
        this.templateFactory = templateFactory;
    }
};
ResendEmailConfirmationHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(ResendEmailConfirmationCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _useraccountconfig.UserAccountConfig === "undefined" ? Object : _useraccountconfig.UserAccountConfig,
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService,
        typeof _emailtemplates.EmailTemplates === "undefined" ? Object : _emailtemplates.EmailTemplates
    ])
], ResendEmailConfirmationHandler);

//# sourceMappingURL=resend-email-confirmation.usecase.js.map