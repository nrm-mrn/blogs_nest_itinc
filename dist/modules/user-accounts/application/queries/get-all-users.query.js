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
    get GetAllUsersQuery () {
        return GetAllUsersQuery;
    },
    get GetAllUsersQueryHandler () {
        return GetAllUsersQueryHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _basepaginatedviewdto = require("../../../../core/dto/base.paginated.view-dto");
const _usersviewdto = require("../../api/view-dto/users.view-dto");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("../../domain/user.entity");
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
let GetAllUsersQuery = class GetAllUsersQuery {
    constructor(params){
        this.params = params;
    }
};
let GetAllUsersQueryHandler = class GetAllUsersQueryHandler {
    async execute(query) {
        const filter = this.getFilter(query.params);
        const users = await this.UserModel.find(filter).sort({
            [query.params.sortBy]: query.params.sortDirection
        }).skip(query.params.calculateSkip()).limit(query.params.pageSize).exec();
        const total = await this.UserModel.countDocuments(filter).exec();
        const usersView = users.map((user)=>{
            return _usersviewdto.UserViewDto.mapToView(user);
        });
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: usersView,
            page: query.params.pageNumber,
            size: query.params.pageSize,
            totalCount: total
        });
    }
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
    constructor(UserModel){
        this.UserModel = UserModel;
    }
};
GetAllUsersQueryHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(GetAllUsersQuery),
    _ts_param(0, (0, _mongoose.InjectModel)(_userentity.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserModelType === "undefined" ? Object : _userentity.UserModelType
    ])
], GetAllUsersQueryHandler);

//# sourceMappingURL=get-all-users.query.js.map