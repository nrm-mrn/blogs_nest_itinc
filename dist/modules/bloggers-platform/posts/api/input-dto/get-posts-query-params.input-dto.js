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
    get GetPostsQueryParams () {
        return GetPostsQueryParams;
    },
    get PostsSortBy () {
        return PostsSortBy;
    }
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
const _basequeryparamsinputdto = require("../../../../../core/dto/base.query-params.input-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var PostsSortBy = /*#__PURE__*/ function(PostsSortBy) {
    PostsSortBy["CreatedAt"] = "createdAt";
    PostsSortBy["Title"] = "title";
    PostsSortBy["ShortDescription"] = "shortDescription";
    PostsSortBy["Content"] = "content";
    PostsSortBy["BlogId"] = "blogId";
    PostsSortBy["BlogName"] = "blogName";
    return PostsSortBy;
}({});
let GetPostsQueryParams = class GetPostsQueryParams extends _basequeryparamsinputdto.BaseQueryParams {
    constructor(...args){
        super(...args), this.sortBy = "createdAt";
    }
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'sorting enum',
        enum: PostsSortBy
    }),
    (0, _classvalidator.IsEnum)(PostsSortBy),
    _ts_metadata("design:type", String)
], GetPostsQueryParams.prototype, "sortBy", void 0);

//# sourceMappingURL=get-posts-query-params.input-dto.js.map