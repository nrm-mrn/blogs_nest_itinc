"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsService", {
    enumerable: true,
    get: function() {
        return PostsService;
    }
});
const _common = require("@nestjs/common");
const _postentity = require("../domain/post.entity");
const _postsrepository = require("../infrastructure/posts.repository");
const _blogsrepository = require("../../blogs/infrastructure/blogs.repository");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _mongoose = require("@nestjs/mongoose");
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
let PostsService = class PostsService {
    async getParentBlog(blogId) {
        const blog = await this.blogRepository.findById(blogId);
        if (!blog) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Wrong blogid',
                extensions: [
                    new _domainexceptions.Extension('wrong blogId', 'blogId')
                ]
            });
        }
        return blog;
    }
    async createPost(input) {
        const blog = await this.getParentBlog(input.blogId);
        const dto = {
            ...input,
            blogName: blog.name
        };
        const newPost = this.PostModel.createPost(dto);
        const postId = await this.postsRepository.save(newPost);
        return {
            postId
        };
    }
    async editPost(id, input) {
        const post = await this.postsRepository.findOrNotFoundFail(id);
        post.updatePost(input);
        await this.postsRepository.save(post);
        return;
    }
    async updatePostsByBlogId(update) {
        return this.postsRepository.updatePostsByBlogId(update);
    }
    async deletePostsByBlogId(id) {
        return this.postsRepository.deletePostsByBlogId(id);
    }
    async deletePost(id) {
        const post = await this.postsRepository.findOrNotFoundFail(id);
        await this.postsRepository.deletePost(post);
    // if (res) {
    //   await Promise.all([
    //     this.postsRepository.deleteLikesByPost(id),
    //     this.commentsService.deleteCommentsByPost(id),
    //   ]);
    //   return;
    // }
    // throw new Error('Failed to delete a post');
    }
    constructor(PostModel, postsRepository, blogRepository){
        this.PostModel = PostModel;
        this.postsRepository = postsRepository;
        this.blogRepository = blogRepository;
    }
};
PostsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_postentity.Post.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postentity.PostModelType === "undefined" ? Object : _postentity.PostModelType,
        typeof _postsrepository.PostsRepository === "undefined" ? Object : _postsrepository.PostsRepository,
        typeof _blogsrepository.BlogsRepository === "undefined" ? Object : _blogsrepository.BlogsRepository
    ])
], PostsService);

//# sourceMappingURL=posts.service.js.map