"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogViewDto", {
    enumerable: true,
    get: function() {
        return BlogViewDto;
    }
});
let BlogViewDto = class BlogViewDto {
    static mapToView(blog) {
        const dto = new BlogViewDto();
        dto.id = blog._id.toString();
        dto.name = blog.name;
        dto.description = blog.description;
        dto.websiteUrl = blog.websiteUrl;
        dto.isMembership = blog.isMembership;
        dto.createdAt = blog.createdAt.toISOString();
        return dto;
    }
};

//# sourceMappingURL=blogs.view-dto.js.map