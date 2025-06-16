"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsQueryRepository", {
    enumerable: true,
    get: function() {
        return PostsQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _postentity = require("../domain/post.entity");
const _basepaginatedviewdto = require("../../../../core/dto/base.paginated.view-dto");
const _postsviewdto = require("../api/view-dto/posts.view-dto");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _postLikeentity = require("../domain/postLike.entity");
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
let PostsQueryRepository = class PostsQueryRepository {
    async getAllPosts(dto, userId) {
        const posts = await this.PostModel.find({
            deletedAt: null
        }).sort({
            [dto.sortBy]: dto.sortDirection
        }).skip(dto.calculateSkip()).limit(dto.pageSize).exec();
        const total = await this.PostModel.countDocuments().exec();
        const postsView = posts.map((post)=>{
            return _postsviewdto.PostViewDto.mapToView(post);
        });
        if (userId) {
            const postIds = posts.map((postDoc)=>postDoc._id.toString());
            const likes = await this.PostLikeModel.find({
                userId,
                postId: {
                    $in: postIds
                }
            });
            const likesMap = new Map(likes.map((like)=>[
                    like.postId,
                    like.status
                ]));
            postsView.forEach((post)=>{
                post.setLike(likesMap);
            });
        }
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: postsView,
            page: dto.pageNumber,
            size: dto.pageSize,
            totalCount: total
        });
    }
    async findPostOrNotFoundFail(postId, userId) {
        const post = await this.PostModel.findOne({
            _id: postId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Post not found'
        }));
        const postView = _postsviewdto.PostViewDto.mapToView(post);
        if (userId) {
            const like = await this.PostLikeModel.findOne({
                userId,
                postId
            });
            if (like) {
                postView.setLike(like);
            }
        }
        return postView;
    }
    constructor(PostModel, PostLikeModel){
        this.PostModel = PostModel;
        this.PostLikeModel = PostLikeModel;
    }
};
PostsQueryRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_postentity.Post.name)),
    _ts_param(1, (0, _mongoose.InjectModel)(_postLikeentity.PostLike.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postentity.PostModelType === "undefined" ? Object : _postentity.PostModelType,
        typeof _postLikeentity.PostLikeModelType === "undefined" ? Object : _postLikeentity.PostLikeModelType
    ])
], PostsQueryRepository);

//# sourceMappingURL=posts.query-repository.js.map