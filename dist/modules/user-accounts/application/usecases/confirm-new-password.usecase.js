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
    get ConfirmPasswordCommand () {
        return ConfirmPasswordCommand;
    },
    get ConfirmPasswordHandler () {
        return ConfirmPasswordHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _usersrepository = require("../../infrastructure/users.repository");
const _passHashservice = require("../passHash.service");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfirmPasswordCommand = class ConfirmPasswordCommand {
    constructor(code, password){
        this.code = code;
        this.password = password;
    }
};
let ConfirmPasswordHandler = class ConfirmPasswordHandler {
    async execute(command) {
        const user = await this.usersRepository.getUserByPassRecovery(command.code);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Incorrect recovery code',
                extensions: [
                    new _domainexceptions.Extension('incorrect recovery code', 'recoveryCode')
                ]
            });
        }
        const hash = await this.hashService.createHash(command.password);
        user.confirmPassword(hash);
        await this.usersRepository.save(user);
        return;
    }
    constructor(usersRepository, hashService){
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
};
ConfirmPasswordHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(ConfirmPasswordCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _passHashservice.HashService === "undefined" ? Object : _passHashservice.HashService
    ])
], ConfirmPasswordHandler);

//# sourceMappingURL=confirm-new-password.usecase.js.map