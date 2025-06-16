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
const _postsviewdto = require("../api/view-dto/posts.view-dto");
const _postLikeentity = require("../domain/postLike.entity");
const _usersexternalservice = require("../../../user-accounts/application/users.external-service");
const _commentsrepository = require("../../comments/infrastructure/comments.repository");
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
                code: _domainexceptioncodes.DomainExceptionCode.NotFound,
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
        const postIds = await this.postsRepository.findPostIdsByBlog(id);
        await Promise.all([
            this.postsRepository.deletePostsByBlogId(id),
            this.commentsRepository.deleteCommentsForPosts(postIds)
        ]);
        return;
    }
    async deletePost(id) {
        const post = await this.postsRepository.findOrNotFoundFail(id);
        await Promise.all([
            this.postsRepository.deletePost(post),
            this.commentsRepository.deleteCommentsByPost(post._id.toString())
        ]);
        return;
    }
    async handlePostLike(likeDto) {
        const post = await this.postsRepository.findOrNotFoundFail(likeDto.postId);
        const postLike = await this.postsRepository.findPostLikeByUserId(post._id.toString(), likeDto.userId);
        const user = await this.usersService.findUserById(likeDto.userId);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'User not found by id for post like'
            });
        }
        const dto = {
            ...likeDto,
            login: user.login
        };
        if (!postLike) {
            return this.createNewLikeDoc(dto, post);
        }
        return this.updateLikeStatus(dto, postLike, post);
    }
    async createNewLikeDoc(dto, post) {
        if (dto.status === _postsviewdto.PostLikeStatus.NONE) {
            return;
        }
        switch(dto.status){
            case _postsviewdto.PostLikeStatus.LIKE:
                {
                    post.addLike();
                    break;
                }
            case _postsviewdto.PostLikeStatus.DISLIKE:
                {
                    post.addDislike();
                    break;
                }
        }
        const postLike = this.PostLikeModel.createLike(dto);
        if (_postsviewdto.PostLikeStatus.LIKE) {
            await this.postsRepository.save(postLike);
            const recentLikes = await this.postsRepository.getRecentLikeDocsForPost(dto.postId, _postsviewdto.PostLikeStatus.LIKE);
            post.updateNewestLikes(recentLikes);
            await this.postsRepository.save(post);
            return;
        }
        await Promise.all([
            this.postsRepository.save(post),
            this.postsRepository.save(postLike)
        ]);
        return;
    }
    async updateLikeStatus(dto, like, post) {
        if (like.status === dto.status) {
            return;
        }
        switch(dto.status){
            case _postsviewdto.PostLikeStatus.LIKE:
                {
                    post.addLike();
                    if (like.status === _postsviewdto.PostLikeStatus.DISLIKE) {
                        post.removeDislike();
                    }
                    break;
                }
            case _postsviewdto.PostLikeStatus.DISLIKE:
                {
                    post.addDislike();
                    if (like.status === _postsviewdto.PostLikeStatus.LIKE) {
                        post.removeLike();
                    }
                    break;
                }
            case _postsviewdto.PostLikeStatus.NONE:
                {
                    if (like.status === _postsviewdto.PostLikeStatus.LIKE) {
                        post.removeLike();
                        break;
                    }
                    post.removeDislike();
                    break;
                }
        }
        like.status = dto.status;
        //NOTE: the only case when LIKEs do not change
        if (dto.status === _postsviewdto.PostLikeStatus.NONE && like.status !== _postsviewdto.PostLikeStatus.LIKE) {
            await Promise.all([
                this.postsRepository.save(post),
                this.postsRepository.save(like)
            ]);
            return;
        }
        await this.postsRepository.save(like);
        const recentLikes = await this.postsRepository.getRecentLikeDocsForPost(dto.postId, _postsviewdto.PostLikeStatus.LIKE);
        post.updateNewestLikes(recentLikes);
        await this.postsRepository.save(post);
        return;
    }
    constructor(PostModel, PostLikeModel, postsRepository, commentsRepository, blogRepository, usersService){
        this.PostModel = PostModel;
        this.PostLikeModel = PostLikeModel;
        this.postsRepository = postsRepository;
        this.commentsRepository = commentsRepository;
        this.blogRepository = blogRepository;
        this.usersService = usersService;
    }
};
PostsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_postentity.Post.name)),
    _ts_param(1, (0, _mongoose.InjectModel)(_postLikeentity.PostLike.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postentity.PostModelType === "undefined" ? Object : _postentity.PostModelType,
        typeof _postLikeentity.PostLikeModelType === "undefined" ? Object : _postLikeentity.PostLikeModelType,
        typeof _postsrepository.PostsRepository === "undefined" ? Object : _postsrepository.PostsRepository,
        typeof _commentsrepository.CommentsRepository === "undefined" ? Object : _commentsrepository.CommentsRepository,
        typeof _blogsrepository.BlogsRepository === "undefined" ? Object : _blogsrepository.BlogsRepository,
        typeof _usersexternalservice.UsersExternalService === "undefined" ? Object : _usersexternalservice.UsersExternalService
    ])
], PostsService);

//# sourceMappingURL=posts.service.js.map