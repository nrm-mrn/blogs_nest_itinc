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
    get GetUserQuery () {
        return GetUserQuery;
    },
    get GetUserQueryHandler () {
        return GetUserQueryHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _userentity = require("../../domain/user.entity");
const _mongoose = require("@nestjs/mongoose");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let GetUserQuery = class GetUserQuery {
    constructor(userId){
        this.userId = userId;
    }
};
let GetUserQueryHandler = class GetUserQueryHandler {
    async execute(query) {
        const user = await this.UserModel.findOne({
            _id: query.userId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'User not found after creation'
        }));
        return {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt.toISOString()
        };
    }
    constructor(UserModel){
        this.UserModel = UserModel;
    }
};
GetUserQueryHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(GetUserQuery),
    _ts_param(0, (0, _mongoose.InjectModel)(_userentity.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserModelType === "undefined" ? Object : _userentity.UserModelType
    ])
], GetUserQueryHandler);

//# sourceMappingURL=get-user.query.js.map