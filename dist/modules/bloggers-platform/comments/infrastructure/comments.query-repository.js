"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentsQueryRepository", {
    enumerable: true,
    get: function() {
        return CommentsQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _basepaginatedviewdto = require("../../../../core/dto/base.paginated.view-dto");
const _commentviewdto = require("../api/view-dto/comment-view.dto");
const _mongoose = require("@nestjs/mongoose");
const _commententity = require("../domain/comment.entity");
const _commentlikeentity = require("../domain/comment-like.entity");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
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
let CommentsQueryRepository = class CommentsQueryRepository {
    async getCommentsForPost(dto) {
        const comments = await this.CommentModel.find({
            postId: dto.postId,
            deletedAt: null
        }).sort({
            [dto.query.sortBy]: dto.query.sortDirection
        }).skip(dto.query.calculateSkip()).limit(dto.query.pageSize).exec();
        const total = await this.CommentModel.countDocuments().exec();
        const commentsView = comments.map((comment)=>_commentviewdto.CommentViewDto.mapToView(comment));
        if (dto.userId) {
            const commentIds = comments.map((commentDoc)=>commentDoc._id.toString());
            const likes = await this.CommentLikeModel.find({
                userId: dto.userId,
                commentId: {
                    $in: {
                        commentIds
                    }
                }
            });
            const likesMap = new Map(likes.map((like)=>[
                    like.commentId,
                    like.status
                ]));
            commentsView.forEach((comment)=>comment.setLike(likesMap));
        }
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: commentsView,
            page: dto.query.pageNumber,
            size: dto.query.pageSize,
            totalCount: total
        });
    }
    async findCommentOrNotFoundFail(dto) {
        const comment = await this.CommentModel.findOne({
            _id: dto.commentId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Comment not found'
        }));
        const commentView = _commentviewdto.CommentViewDto.mapToView(comment);
        if (dto.userId) {
            const like = await this.CommentLikeModel.findOne({
                commentId: dto.commentId,
                userId: dto.userId
            });
            if (like) {
                commentView.setLike(like);
            }
        }
        return commentView;
    }
    constructor(CommentModel, CommentLikeModel){
        this.CommentModel = CommentModel;
        this.CommentLikeModel = CommentLikeModel;
    }
};
CommentsQueryRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_commententity.Comment.name)),
    _ts_param(1, (0, _mongoose.InjectModel)(_commentlikeentity.CommentLike.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commententity.CommentModelType === "undefined" ? Object : _commententity.CommentModelType,
        typeof _commentlikeentity.CommentLikeModelType === "undefined" ? Object : _commentlikeentity.CommentLikeModelType
    ])
], CommentsQueryRepository);

//# sourceMappingURL=comments.query-repository.js.map