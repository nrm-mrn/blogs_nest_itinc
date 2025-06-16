"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostsController", {
    enumerable: true,
    get: function() {
        return PostsController;
    }
});
const _common = require("@nestjs/common");
const _postsqueryrepository = require("../infrastructure/posts.query-repository");
const _postsservice = require("../application/posts.service");
const _getpostsqueryparamsinputdto = require("./input-dto/get-posts-query-params.input-dto");
const _postsinputdto = require("./input-dto/posts.input-dto");
const _objectidvalidationpipeservice = require("../../../../core/pipes/object-id-validation-pipe.service");
const _getpostcommentsqueryparamsinputdto = require("./input-dto/get-post-comments-query-params.input-dto");
const _postlikeinputdto = require("./input-dto/post-like.input-dto");
const _extractuserfromrequestdecorator = require("../../../user-accounts/guards/decorators/extract-user-from-request.decorator");
const _usercontextdto = require("../../../user-accounts/guards/dto/user-context.dto");
const _jwtoptionalguard = require("../../../user-accounts/guards/bearer/jwt-optional-guard");
const _jwtauthguard = require("../../../user-accounts/guards/bearer/jwt-auth.guard");
const _basicauthguard = require("../../../user-accounts/guards/basic/basic-auth.guard");
const _extractuserifexistsfromrequestdecorator = require("../../../user-accounts/guards/decorators/extract-user-if-exists-from-request.decorator");
const _cqrs = require("@nestjs/cqrs");
const _getcommentsforpostquery = require("../../comments/application/queries/get-comments-for-post.query");
const _createcommentforpostinputdto = require("./input-dto/create-comment-for-post.input-dto");
const _createcommentusecase = require("../../comments/application/usecases/create-comment.usecase");
const _getcommentquery = require("../../comments/application/queries/get-comment.query");
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
let PostsController = class PostsController {
    async getPosts(query, user) {
        return this.postsQueryRepo.getAllPosts(query, user?.userId);
    }
    async createPost(query) {
        const { postId } = await this.postsService.createPost(query);
        return this.postsQueryRepo.findPostOrNotFoundFail(postId);
    }
    async getPost(id, user) {
        return this.postsQueryRepo.findPostOrNotFoundFail(id, user?.userId);
    }
    async editPost(id, query) {
        return this.postsService.editPost(id, query);
    }
    async deletePost(id) {
        return this.postsService.deletePost(id);
    }
    async handlePostLike(postId, body, user) {
        const dto = {
            postId,
            userId: user.userId,
            status: body.likeStatus
        };
        return this.postsService.handlePostLike(dto);
    }
    async createCommentForPost(body, postId, user) {
        const commentId = await this.commandBus.execute(new _createcommentusecase.CreateCommentCommand(postId, user.userId, body.content));
        return this.queryBus.execute(new _getcommentquery.GetCommentQuery(commentId, user.userId));
    }
    async getCommentsForPost(postId, query, user) {
        return this.queryBus.execute(new _getcommentsforpostquery.GetCommentsByPostQuery(query, postId, user.userId));
    }
    constructor(postsQueryRepo, postsService, queryBus, commandBus){
        this.postsQueryRepo = postsQueryRepo;
        this.postsService = postsService;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_jwtoptionalguard.JwtOptionalAuthGuard),
    (0, _common.Get)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Query)()),
    _ts_param(1, (0, _extractuserifexistsfromrequestdecorator.ExtractUserFromRequestIfExists)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getpostsqueryparamsinputdto.GetPostsQueryParams === "undefined" ? Object : _getpostsqueryparamsinputdto.GetPostsQueryParams,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
_ts_decorate([
    (0, _common.UseGuards)(_basicauthguard.BasicAuthGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsinputdto.CreatePostInputDto === "undefined" ? Object : _postsinputdto.CreatePostInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtoptionalguard.JwtOptionalAuthGuard),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _extractuserifexistsfromrequestdecorator.ExtractUserFromRequestIfExists)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
_ts_decorate([
    (0, _common.UseGuards)(_basicauthguard.BasicAuthGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _postsinputdto.UpdatePostInputDto === "undefined" ? Object : _postsinputdto.UpdatePostInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "editPost", null);
_ts_decorate([
    (0, _common.UseGuards)(_basicauthguard.BasicAuthGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Put)(':postId/like-status'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('postId', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _postlikeinputdto.PostLikeInputDto === "undefined" ? Object : _postlikeinputdto.PostLikeInputDto,
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "handlePostLike", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)(':postId/comments'),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Param)('postId', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(2, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createcommentforpostinputdto.CreateCommentForPostInputDto === "undefined" ? Object : _createcommentforpostinputdto.CreateCommentForPostInputDto,
        String,
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "createCommentForPost", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtoptionalguard.JwtOptionalAuthGuard),
    (0, _common.Get)(':id/comments'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _common.Query)()),
    _ts_param(2, (0, _extractuserifexistsfromrequestdecorator.ExtractUserFromRequestIfExists)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _getpostcommentsqueryparamsinputdto.GetPostCommentsQueryParams === "undefined" ? Object : _getpostcommentsqueryparamsinputdto.GetPostCommentsQueryParams,
        typeof _usercontextdto.Nullable === "undefined" ? Object : _usercontextdto.Nullable
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getCommentsForPost", null);
PostsController = _ts_decorate([
    (0, _common.Controller)('posts'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsqueryrepository.PostsQueryRepository === "undefined" ? Object : _postsqueryrepository.PostsQueryRepository,
        typeof _postsservice.PostsService === "undefined" ? Object : _postsservice.PostsService,
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus,
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus
    ])
], PostsController);

//# sourceMappingURL=posts.controller.js.map