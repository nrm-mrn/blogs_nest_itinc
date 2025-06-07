"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersQueryRepository", {
    enumerable: true,
    get: function() {
        return UsersQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("../domain/user.entity");
const _basepaginatedviewdto = require("../../../core/dto/base.paginated.view-dto");
const _usersviewdto = require("../api/view-dto/users.view-dto");
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
let UsersQueryRepository = class UsersQueryRepository {
    getFilter(dto) {
        const filter = {
            deletedAt: null
        };
        let searchLogin = null;
        let searchEmail = null;
        if ('searchLoginTerm' in dto && dto.searchLoginTerm !== null) {
            searchLogin = {
                login: {
                    $regex: dto.searchLoginTerm,
                    $options: 'i'
                }
            };
        }
        if ('searchEmailTerm' in dto && dto.searchEmailTerm !== null) {
            searchEmail = {
                email: {
                    $regex: dto.searchEmailTerm,
                    $options: 'i'
                }
            };
        }
        if (searchLogin) {
            if (searchEmail) {
                return {
                    ...filter,
                    $or: [
                        searchEmail,
                        searchLogin
                    ]
                };
            }
            return {
                ...filter,
                $or: [
                    searchLogin
                ]
            };
        }
        if (searchEmail) {
            return {
                ...filter,
                $or: [
                    searchEmail
                ]
            };
        }
        return filter;
    }
    async getAllUsers(dto) {
        const filter = this.getFilter(dto);
        const users = await this.UserModel.find(filter).sort({
            [dto.sortBy]: dto.sortDirection
        }).skip(dto.calculateSkip()).limit(dto.pageSize).exec();
        const total = await this.UserModel.countDocuments(filter).exec();
        const usersView = users.map((user)=>{
            return _usersviewdto.UserViewDto.mapToView(user);
        });
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: usersView,
            page: dto.pageNumber,
            size: dto.pageSize,
            totalCount: total
        });
    }
    async getUserById(id) {
        //for users router post method
        const user = await this.UserModel.findOne({
            _id: id,
            deletedAt: null
        });
        if (!user) {
            return null;
        }
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
UsersQueryRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_userentity.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserModelType === "undefined" ? Object : _userentity.UserModelType
    ])
], UsersQueryRepository);

//# sourceMappingURL=users.query-repository.js.map