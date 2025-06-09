"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetBlogPostsQueryParams", {
    enumerable: true,
    get: function() {
        return GetBlogPostsQueryParams;
    }
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
const _basequeryparamsinputdto = require("../../../../../core/dto/base.query-params.input-dto");
const _getpostsqueryparamsinputdto = require("../../../posts/api/input-dto/get-posts-query-params.input-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetBlogPostsQueryParams = class GetBlogPostsQueryParams extends _basequeryparamsinputdto.BaseQueryParams {
    constructor(...args){
        super(...args), this.sortBy = _getpostsqueryparamsinputdto.PostsSortBy.CreatedAt;
    }
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'sorting enum',
        enum: _getpostsqueryparamsinputdto.PostsSortBy
    }),
    (0, _classvalidator.IsEnum)(_getpostsqueryparamsinputdto.PostsSortBy),
    _ts_metadata("design:type", typeof _getpostsqueryparamsinputdto.PostsSortBy === "undefined" ? Object : _getpostsqueryparamsinputdto.PostsSortBy)
], GetBlogPostsQueryParams.prototype, "sortBy", void 0);

//# sourceMappingURL=get-blog-posts-query-params.input-dto.js.map