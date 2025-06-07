"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogService", {
    enumerable: true,
    get: function() {
        return BlogService;
    }
});
const _common = require("@nestjs/common");
const _blogentity = require("../domain/blog.entity");
const _mongoose = require("@nestjs/mongoose");
const _blogsrepository = require("../infrastructure/blogs.repository");
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
let BlogService = class BlogService {
    async createBlog(dto) {
        const newBlog = this.BlogModel.createBlog(dto);
        const blogId = await this.blogRepository.save(newBlog);
        return {
            blogId
        };
    }
    async editBlog(id, dto) {
        const blog = await this.blogRepository.findOrNotFoundFail(id);
        //TODO: update post once entity is there
        // if (blog.name !== input.name) {
        //   await this.postsService.editPostsByBlogId(
        //     { id, blogName: input.name }
        //   )
        // }
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
        await this.blogRepository.save(blog);
        return;
    }
    async deleteBlog(id) {
        const blog = await this.blogRepository.findOrNotFoundFail(id);
        await this.blogRepository.deleteBlog(blog);
    //TODO: cascade delete posts
    // await this.postsService.deletePostsByBlogId(id);
    }
    constructor(BlogModel, blogRepository){
        this.BlogModel = BlogModel;
        this.blogRepository = blogRepository;
    }
};
BlogService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_blogentity.Blog.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blogentity.BlogModelType === "undefined" ? Object : _blogentity.BlogModelType,
        typeof _blogsrepository.BlogsRepository === "undefined" ? Object : _blogsrepository.BlogsRepository
    ])
], BlogService);

//# sourceMappingURL=blog.service.js.map