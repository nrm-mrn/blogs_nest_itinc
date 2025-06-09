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
const _commentsqueryrepository = require("../../comments/infrastructure/comments.query-repository");
const _getpostcommentsdto = require("./input-dto/get-post-comments-dto");
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
    async getPosts(query) {
        return this.postsQueryRepo.getAllPosts(query);
    }
    async createPost(query) {
        const { postId } = await this.postsService.createPost(query);
        return this.postsQueryRepo.findPostOrNotFoundFail(postId);
    }
    async getPost(id) {
        return this.postsQueryRepo.findPostOrNotFoundFail(id);
    }
    async editPost(id, query) {
        return this.postsService.editPost(id, query);
    }
    async deletePost(id) {
        return this.postsService.deletePost(id);
    }
    async getCommentsForPost(postId, query) {
        const dto = Object.assign(new _getpostcommentsdto.GetPostCommentsDto(), query, {
            postId
        });
        return this.commentsQueryRepo.getCommentsForPosts(dto);
    }
    constructor(postsQueryRepo, commentsQueryRepo, postsService){
        this.postsQueryRepo = postsQueryRepo;
        this.commentsQueryRepo = commentsQueryRepo;
        this.postsService = postsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getpostsqueryparamsinputdto.GetPostsQueryParams === "undefined" ? Object : _getpostsqueryparamsinputdto.GetPostsQueryParams
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
_ts_decorate([
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
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
_ts_decorate([
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
    (0, _common.Get)(':postId/comments'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('postId', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _getpostcommentsqueryparamsinputdto.GetPostCommentsQueryParams === "undefined" ? Object : _getpostcommentsqueryparamsinputdto.GetPostCommentsQueryParams
    ]),
    _ts_metadata("design:returntype", Promise)
], PostsController.prototype, "getCommentsForPost", null);
PostsController = _ts_decorate([
    (0, _common.Controller)('posts'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _postsqueryrepository.PostsQueryRepository === "undefined" ? Object : _postsqueryrepository.PostsQueryRepository,
        typeof _commentsqueryrepository.CommentsQueryRepository === "undefined" ? Object : _commentsqueryrepository.CommentsQueryRepository,
        typeof _postsservice.PostsService === "undefined" ? Object : _postsservice.PostsService
    ])
], PostsController);

//# sourceMappingURL=posts.controller.js.map