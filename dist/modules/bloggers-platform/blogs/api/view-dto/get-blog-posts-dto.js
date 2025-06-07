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
    get BlogPostsSortBy () {
        return BlogPostsSortBy;
    },
    get GetBlogPostsDto () {
        return GetBlogPostsDto;
    }
});
const _basequeryparamsinputdto = require("../../../../../core/dto/base.query-params.input-dto");
var BlogPostsSortBy = /*#__PURE__*/ function(BlogPostsSortBy) {
    BlogPostsSortBy["CreatedAt"] = "createdAt";
    return BlogPostsSortBy;
}({});
let GetBlogPostsDto = class GetBlogPostsDto extends _basequeryparamsinputdto.BaseQueryParams {
};

//# sourceMappingURL=get-blog-posts-dto.js.map