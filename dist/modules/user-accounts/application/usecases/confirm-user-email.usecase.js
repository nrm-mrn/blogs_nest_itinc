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
    get ConfirmUserEmailCommand () {
        return ConfirmUserEmailCommand;
    },
    get ConfirmUserEmailHandler () {
        return ConfirmUserEmailHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _usersrepository = require("../../infrastructure/users.repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfirmUserEmailCommand = class ConfirmUserEmailCommand {
    constructor(code){
        this.code = code;
    }
};
let ConfirmUserEmailHandler = class ConfirmUserEmailHandler {
    async execute(command) {
        const user = await this.usersRepository.findUserByEmailConfirmation(command.code);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'User with provided code does not exist',
                extensions: [
                    new _domainexceptions.Extension('User with provided code does not exist', 'code')
                ]
            });
        }
        user.confirmEmail();
        await this.usersRepository.save(user);
        return;
    }
    constructor(usersRepository){
        this.usersRepository = usersRepository;
    }
};
ConfirmUserEmailHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(ConfirmUserEmailCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository
    ])
], ConfirmUserEmailHandler);

//# sourceMappingURL=confirm-user-email.usecase.js.map