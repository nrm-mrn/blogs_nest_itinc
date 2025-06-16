"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentsRepository", {
    enumerable: true,
    get: function() {
        return CommentsRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _commententity = require("../domain/comment.entity");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _commentlikeentity = require("../domain/comment-like.entity");
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
let CommentsRepository = class CommentsRepository {
    async save(doc) {
        const savedDoc = await doc.save();
        return savedDoc._id.toString();
    }
    async findCommentByIdOrFail(id) {
        const comment = await this.CommentModel.findOne({
            _id: id,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Comment not found'
        }));
        return comment;
    }
    async deleteComment(comment) {
        comment.markDeleted();
        await Promise.all([
            this.save(comment),
            this.CommentLikeModel.deleteMany({
                commentId: comment._id.toString()
            })
        ]);
        return;
    }
    async deleteCommentsByPost(postId) {
        const ids = await this.CommentModel.find({
            postId
        }).then((comments)=>{
            return comments.map((comment)=>comment._id.toString());
        });
        await Promise.all([
            this.CommentModel.updateMany({
                postId
            }, {
                deletedAt: new Date()
            }),
            this.CommentLikeModel.deleteMany({
                commentId: {
                    $in: ids
                }
            })
        ]);
    }
    async deleteCommentsForPosts(postIds) {
        const commentIds = await this.CommentModel.find({
            postId: {
                $in: postIds
            }
        }).then((comments)=>comments.map((comment)=>comment._id.toString()));
        await Promise.all([
            this.CommentModel.updateMany({
                postId: {
                    $in: postIds
                }
            }, {
                deletedAt: new Date()
            }),
            this.deleteCommentsLikes(commentIds)
        ]);
        return;
    }
    async deleteCommentsLikes(commentIds) {
        return this.CommentLikeModel.deleteMany({
            commentId: {
                $in: commentIds
            }
        });
    }
    async findCommLikeByUser(commentId, userId) {
        const like = await this.CommentLikeModel.findOne({
            commentId,
            userId
        }).exec();
        return like;
    }
    constructor(CommentModel, CommentLikeModel){
        this.CommentModel = CommentModel;
        this.CommentLikeModel = CommentLikeModel;
    }
};
CommentsRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_commententity.Comment.name)),
    _ts_param(1, (0, _mongoose.InjectModel)(_commentlikeentity.CommentLike.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commententity.CommentModelType === "undefined" ? Object : _commententity.CommentModelType,
        typeof _commentlikeentity.CommentLikeModelType === "undefined" ? Object : _commentlikeentity.CommentLikeModelType
    ])
], CommentsRepository);

//# sourceMappingURL=comments.repository.js.map