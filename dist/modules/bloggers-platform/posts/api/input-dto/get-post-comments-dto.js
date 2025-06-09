"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetPostCommentsDto", {
    enumerable: true,
    get: function() {
        return GetPostCommentsDto;
    }
});
const _basequeryparamsinputdto = require("../../../../../core/dto/base.query-params.input-dto");
const _getpostsqueryparamsinputdto = require("./get-posts-query-params.input-dto");
let GetPostCommentsDto = class GetPostCommentsDto extends _basequeryparamsinputdto.BaseQueryParams {
    constructor(...args){
        super(...args), this.sortBy = _getpostsqueryparamsinputdto.PostsSortBy.CreatedAt, this.userId = undefined;
    }
};

//# sourceMappingURL=get-post-comments-dto.js.map