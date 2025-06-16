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
    get DeleteCommentCommand () {
        return DeleteCommentCommand;
    },
    get DeleteCommentCommandHandler () {
        return DeleteCommentCommandHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _commentsrepository = require("../../infrastructure/comments.repository");
const _domainexceptions = require("../../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../../core/exceptions/domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteCommentCommand = class DeleteCommentCommand {
    constructor(commentId, userId){
        this.commentId = commentId;
        this.userId = userId;
    }
};
let DeleteCommentCommandHandler = class DeleteCommentCommandHandler {
    async execute(command) {
        const comment = await this.commentsRepository.findCommentByIdOrFail(command.commentId);
        if (comment.commentatorInfo.userId !== command.userId) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.Forbidden,
                message: 'Could not delete another commentators comment'
            });
        }
        return this.commentsRepository.deleteComment(comment);
    }
    constructor(commentsRepository){
        this.commentsRepository = commentsRepository;
    }
};
DeleteCommentCommandHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(DeleteCommentCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commentsrepository.CommentsRepository === "undefined" ? Object : _commentsrepository.CommentsRepository
    ])
], DeleteCommentCommandHandler);

//# sourceMappingURL=delete-comment.usecase.js.map