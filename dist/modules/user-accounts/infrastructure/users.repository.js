"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersRepository", {
    enumerable: true,
    get: function() {
        return UsersRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("../domain/user.entity");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
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
let UsersRepository = class UsersRepository {
    async save(user) {
        await user.save();
        return user._id.toString();
    }
    async findById(userId) {
        const user = await this.UserModel.findOne({
            _id: userId,
            deletedAt: null
        });
        return user;
    }
    async findOrNotFoundFail(userId) {
        const user = await this.UserModel.findOne({
            _id: userId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'User not found'
        }));
        return user;
    }
    async deleteUser(user) {
        user.markDeleted();
        return this.save(user);
    }
    async findUserByLoginOrEmail(input) {
        const user = await this.UserModel.findOne().or([
            {
                login: input
            },
            {
                email: input
            }
        ]).where('deletedAt').equals(null);
        return user;
    }
    async findUserByEmail(input) {
        const user = await this.UserModel.findOne({
            email: input,
            deletedAt: null
        });
        return user;
    }
    async findUserByEmailConfirmation(code) {
        const user = await this.UserModel.findOne({
            'emailConfirmation.confirmationCode': code,
            deletedAt: null
        });
        return user;
    }
    async getUserByPassRecovery(code) {
        const user = await this.UserModel.findOne({
            'passwordRecovery.confirmationCode': code,
            deletedAt: null
        });
        return user;
    }
    constructor(UserModel){
        this.UserModel = UserModel;
    }
};
UsersRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_userentity.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserModelType === "undefined" ? Object : _userentity.UserModelType
    ])
], UsersRepository);

//# sourceMappingURL=users.repository.js.map