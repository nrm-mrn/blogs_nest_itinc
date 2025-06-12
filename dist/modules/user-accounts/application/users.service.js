"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersService", {
    enumerable: true,
    get: function() {
        return UsersService;
    }
});
const _common = require("@nestjs/common");
const _usersrepository = require("../infrastructure/users.repository");
const _passHashservice = require("./passHash.service");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("../domain/user.entity");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UsersService = class UsersService {
    async createUser(input) {
        const uniqueLogin = await this.isLoginUnique(input.login);
        if (!uniqueLogin) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Login already exists',
                extensions: [
                    new _domainexceptions.Extension('Login already exist', 'login')
                ]
            });
        }
        const uniqueEmail = await this.isEmailUnique(input.email);
        if (!uniqueEmail) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Email already exists',
                extensions: [
                    new _domainexceptions.Extension('Email already exist', 'email')
                ]
            });
        }
        const hash = await this.hashService.createHash(input.password);
        const newUser = this.UserModel.createUser({
            email: input.email,
            login: input.login,
            passHash: hash
        });
        const userId = await this.usersRepository.save(newUser);
        return {
            userId
        };
    }
    async isLoginUnique(login) {
        const loginRes = await this.usersRepository.findUserByLoginOrEmail(login);
        if (loginRes) {
            return false;
        }
        return true;
    }
    async isEmailUnique(email) {
        const emailRes = await this.usersRepository.findUserByLoginOrEmail(email);
        if (emailRes) {
            return false;
        }
        return true;
    }
    async findUserById(id) {
        return this.usersRepository.findById(id);
    }
    async getUserByLoginOrEmail(input) {
        const user = await this.usersRepository.findUserByLoginOrEmail(input);
        return user;
    }
    async deleteUser(userId) {
        const user = await this.usersRepository.findOrNotFoundFail(userId);
        await this.usersRepository.deleteUser(user);
    }
    async createEmailConfirmation(email) {
        const user = await this.usersRepository.findUserByEmail(email);
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
        user.genEmailConfirmation(this.configService.get('emailExpiration'));
        await this.usersRepository.save(user);
        return user.emailConfirmation;
    }
    async confirmEmail(code) {
        const user = await this.usersRepository.findUserByEmailConfirmation(code);
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
    async setPasswordRecovery(email) {
        const user = await this.usersRepository.findUserByEmail(email);
        if (!user) {
            return null;
        }
        user.genPasswordRecovery(this.configService.get('passRecoveryExpiration'));
        await this.usersRepository.save(user);
        return user.passwordRecovery;
    }
    async confirmPassword(input) {
        const user = await this.usersRepository.getUserByPassRecovery(input.code);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Incorrect recovery code',
                extensions: [
                    new _domainexceptions.Extension('incorrect recovery code', 'recoveryCode')
                ]
            });
        }
        const hash = await this.hashService.createHash(input.password);
        user.confirmPassword(hash);
        await this.usersRepository.save(user);
        return;
    }
    constructor(UserModel, usersRepository, hashService, configService){
        this.UserModel = UserModel;
        this.usersRepository = usersRepository;
        this.hashService = hashService;
        this.configService = configService;
    }
};
UsersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_userentity.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserModelType === "undefined" ? Object : _userentity.UserModelType,
        typeof _usersrepository.UsersRepository === "undefined" ? Object : _usersrepository.UsersRepository,
        typeof _passHashservice.HashService === "undefined" ? Object : _passHashservice.HashService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], UsersService);

//# sourceMappingURL=users.service.js.map