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
    get GetUsersQueryParams () {
        return GetUsersQueryParams;
    },
    get UsersSortBy () {
        return UsersSortBy;
    }
});
const _classvalidator = require("class-validator");
const _basequeryparamsinputdto = require("../../../../core/dto/base.query-params.input-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var UsersSortBy = /*#__PURE__*/ function(UsersSortBy) {
    UsersSortBy["CreatedAt"] = "createdAt";
    UsersSortBy["Login"] = "login";
    UsersSortBy["Email"] = "email";
    return UsersSortBy;
}({});
let GetUsersQueryParams = class GetUsersQueryParams extends _basequeryparamsinputdto.BaseQueryParams {
    constructor(...args){
        super(...args), this.sortBy = "createdAt", this.searchLoginTerm = null, this.searchEmailTerm = null;
    }
};
_ts_decorate([
    (0, _classvalidator.IsEnum)(UsersSortBy),
    _ts_metadata("design:type", String)
], GetUsersQueryParams.prototype, "sortBy", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], GetUsersQueryParams.prototype, "searchLoginTerm", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], GetUsersQueryParams.prototype, "searchEmailTerm", void 0);

//# sourceMappingURL=get-users-query-params.input-dto.js.map