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
    get CommentLikeCommandHandler () {
        return CommentLikeCommandHandler;
    },
    get HandleCommentLikeCommand () {
        return HandleCommentLikeCommand;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _commentlikeentity = require("../../domain/comment-like.entity");
const _mongoose = require("@nestjs/mongoose");
const _commentsrepository = require("../../infrastructure/comments.repository");
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
let HandleCommentLikeCommand = class HandleCommentLikeCommand {
    constructor(userId, commentId, status){
        this.userId = userId;
        this.commentId = commentId;
        this.status = status;
    }
};
let CommentLikeCommandHandler = class CommentLikeCommandHandler {
    async execute(command) {
        const comment = await this.commentRepository.findCommentByIdOrFail(command.commentId);
        const commentLike = await this.commentRepository.findCommLikeByUser(command.commentId, command.userId);
        const dto = {
            commentId: command.commentId,
            status: command.status,
            userId: command.userId
        };
        if (!commentLike) {
            return this.createNewLikeDoc(dto, comment);
        }
        return this.updateLikeStatus(comment, commentLike, dto);
    }
    async createNewLikeDoc(dto, comment) {
        if (dto.status === _commentlikeentity.CommentLikeStatus.NONE) {
            return;
        }
        switch(dto.status){
            case _commentlikeentity.CommentLikeStatus.LIKE:
                {
                    comment.addLike();
                    break;
                }
            case _commentlikeentity.CommentLikeStatus.DISLIKE:
                {
                    comment.addDislike();
                    break;
                }
        }
        const like = this.CommentLikeModel.createLike({
            ...dto
        });
        await Promise.all([
            this.commentRepository.save(like),
            this.commentRepository.save(comment)
        ]);
        return;
    }
    async updateLikeStatus(comment, like, dto) {
        if (like.status !== dto.status) {
            switch(like.status){
                case _commentlikeentity.CommentLikeStatus.LIKE:
                    {
                        comment.removeLike();
                        if (dto.status === _commentlikeentity.CommentLikeStatus.DISLIKE) {
                            comment.addDislike();
                        }
                        break;
                    }
                case _commentlikeentity.CommentLikeStatus.DISLIKE:
                    {
                        comment.removeDislike();
                        if (dto.status === _commentlikeentity.CommentLikeStatus.LIKE) {
                            comment.addLike();
                        }
                        break;
                    }
                case _commentlikeentity.CommentLikeStatus.NONE:
                    {
                        if (dto.status === _commentlikeentity.CommentLikeStatus.LIKE) {
                            comment.addLike();
                            break;
                        }
                        comment.addDislike();
                        break;
                    }
            }
            like.status = dto.status;
            await Promise.all([
                this.commentRepository.save(like),
                this.commentRepository.save(comment)
            ]);
        }
        return;
    }
    constructor(CommentLikeModel, commentRepository){
        this.CommentLikeModel = CommentLikeModel;
        this.commentRepository = commentRepository;
    }
};
CommentLikeCommandHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(HandleCommentLikeCommand),
    _ts_param(0, (0, _mongoose.InjectModel)(_commentlikeentity.CommentLike.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commentlikeentity.CommentLikeModelType === "undefined" ? Object : _commentlikeentity.CommentLikeModelType,
        typeof _commentsrepository.CommentsRepository === "undefined" ? Object : _commentsrepository.CommentsRepository
    ])
], CommentLikeCommandHandler);

//# sourceMappingURL=handle-comment-like.usecase.js.map