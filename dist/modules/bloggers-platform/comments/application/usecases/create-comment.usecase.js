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
    get CreateCommentCommand () {
        return CreateCommentCommand;
    },
    get CreateCommentCommandHandler () {
        return CreateCommentCommandHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _commentsrepository = require("../../infrastructure/comments.repository");
const _postsrepository = require("../../../posts/infrastructure/posts.repository");
const _usersexternalservice = require("../../../../user-accounts/application/users.external-service");
const _domainexceptions = require("../../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../../core/exceptions/domain-exception-codes");
const _mongoose = require("@nestjs/mongoose");
const _commententity = require("../../domain/comment.entity");
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
let CreateCommentCommand = class CreateCommentCommand {
    constructor(postId, userId, content){
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }
};
let CreateCommentCommandHandler = class CreateCommentCommandHandler {
    async execute(command) {
        await this.postsRepository.findOrNotFoundFail(command.postId);
        const user = await this.usersService.findUserById(command.userId);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'User not found'
            });
        }
        const newComment = this.CommentModel.createComment({
            content: command.content,
            postId: command.postId,
            userId: command.userId,
            userLogin: user.login
        });
        const commentId = await this.commentsRepository.save(newComment);
        return commentId;
    }
    constructor(CommentModel, commentsRepository, postsRepository, usersService){
        this.CommentModel = CommentModel;
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
        this.usersService = usersService;
    }
};
CreateCommentCommandHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(CreateCommentCommand),
    _ts_param(0, (0, _mongoose.InjectModel)(_commententity.Comment.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commententity.CommentModelType === "undefined" ? Object : _commententity.CommentModelType,
        typeof _commentsrepository.CommentsRepository === "undefined" ? Object : _commentsrepository.CommentsRepository,
        typeof _postsrepository.PostsRepository === "undefined" ? Object : _postsrepository.PostsRepository,
        typeof _usersexternalservice.UsersExternalService === "undefined" ? Object : _usersexternalservice.UsersExternalService
    ])
], CreateCommentCommandHandler);

//# sourceMappingURL=create-comment.usecase.js.map