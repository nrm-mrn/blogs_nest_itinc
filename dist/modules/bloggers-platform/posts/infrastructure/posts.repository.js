"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsRepository", {
    enumerable: true,
    get: function() {
        return PostsRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _postentity = require("../domain/post.entity");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
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
let PostsRepository = class PostsRepository {
    async save(post) {
        await post.save();
        return post._id.toString();
    }
    async findById(postId) {
        const post = await this.PostModel.findOne({
            _id: postId,
            deletedAt: null
        });
        return post;
    }
    async findOrNotFoundFail(postId) {
        const post = await this.PostModel.findOne({
            _id: postId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Post not found'
        }));
        return post;
    }
    async updatePostsByBlogId(dto) {
        const res = await this.PostModel.updateMany({
            blogId: dto.blogId
        }, {
            $set: {
                blogName: dto.blogName
            }
        });
        if (res.acknowledged) {
            return;
        }
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'Failed to update posts by blog'
        });
    }
    async deletePostsByBlogId(blogId) {
        const res = await this.PostModel.deleteMany({
            blogId: blogId
        });
        if (res.acknowledged) {
            return;
        }
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'Failed to delete posts by blog'
        });
    }
    async deletePost(post) {
        post.markDeleted();
        return this.save(post);
    }
    constructor(PostModel){
        this.PostModel = PostModel;
    }
};
PostsRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_postentity.Post.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postentity.PostModelType === "undefined" ? Object : _postentity.PostModelType
    ])
], PostsRepository);

//# sourceMappingURL=posts.repository.js.map