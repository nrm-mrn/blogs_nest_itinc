"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostViewDto", {
    enumerable: true,
    get: function() {
        return PostViewDto;
    }
});
let PostViewDto = class PostViewDto {
    static mapToView(post) {
        const dto = new PostViewDto();
        dto.id = post._id.toString();
        dto.title = post.title;
        dto.shortDescription = post.shortDescription;
        dto.content = post.content;
        dto.blogId = post.blogId;
        dto.blogName = post.blogName;
        dto.createdAt = post.createdAt.toISOString();
        return dto;
    }
};

//# sourceMappingURL=posts.view-dto.js.map