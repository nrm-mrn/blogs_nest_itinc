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
    get CreateUserByAdminCommand () {
        return CreateUserByAdminCommand;
    },
    get CreateUserByAdminHandler () {
        return CreateUserByAdminHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _usersrepository = require("../../infrastructure/users.repository");
const _usersservice = require("../users.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateUserByAdminCommand = class CreateUserByAdminCommand {
    constructor(login, password, email){
        this.login = login;
        this.password = password;
        this.email = email;
    }
};
let CreateUserByAdminHandler = class CreateUserByAdminHandler {
    async execute(command) {
        const newUser = await this.usersService.createUserDoc(command);
        newUser.confirmEmailByAdmin();
        const userId = await this.usersRepository.save(newUser);
        return {
            userId
        };
    }
    constructor(usersRepository, usersService){
        this.usersRepository = usersRepository;
        this.usersService = usersService;
    }
};
CreateUserByAdminHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(CreateUserByAdminCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], CreateUserByAdminHandler);

//# sourceMappingURL=create-user.usecase.js.map