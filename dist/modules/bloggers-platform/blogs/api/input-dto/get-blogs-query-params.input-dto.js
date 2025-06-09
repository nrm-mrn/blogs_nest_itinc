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
    get BlogsSortBy () {
        return BlogsSortBy;
    },
    get GetBlogsQueryParams () {
        return GetBlogsQueryParams;
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
var BlogsSortBy = /*#__PURE__*/ function(BlogsSortBy) {
    BlogsSortBy["CreatedAt"] = "createdAt";
    BlogsSortBy["Name"] = "name";
    BlogsSortBy["Description"] = "description";
    BlogsSortBy["WebsiteUrl"] = "websiteUrl";
    return BlogsSortBy;
}({});
let GetBlogsQueryParams = class GetBlogsQueryParams extends _basequeryparamsinputdto.BaseQueryParams {
    constructor(...args){
        super(...args), this.sortBy = "createdAt", this.searchNameTerm = null;
    }
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'column for sorting, for now only createdAt is supported',
        enum: BlogsSortBy
    }),
    (0, _classvalidator.IsEnum)(BlogsSortBy),
    _ts_metadata("design:type", String)
], GetBlogsQueryParams.prototype, "sortBy", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'term to perform search in blog names',
        default: null
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], GetBlogsQueryParams.prototype, "searchNameTerm", void 0);

//# sourceMappingURL=get-blogs-query-params.input-dto.js.map