"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentsController", {
    enumerable: true,
    get: function() {
        return CommentsController;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _objectidvalidationpipeservice = require("../../../../core/pipes/object-id-validation-pipe.service");
const _getcommentquery = require("../application/queries/get-comment.query");
const _jwtoptionalguard = require("../../../user-accounts/guards/bearer/jwt-optional-guard");
const _extractuserifexistsfromrequestdecorator = require("../../../user-accounts/guards/decorators/extract-user-if-exists-from-request.decorator");
const _usercontextdto = require("../../../user-accounts/guards/dto/user-context.dto");
const _jwtauthguard = require("../../../user-accounts/guards/bearer/jwt-auth.guard");
const _updatecommentinputdto = require("./input-dto/update-comment.input-dto");
const _extractuserfromrequestdecorator = require("../../../user-accounts/guards/decorators/extract-user-from-request.decorator");
const _updatecommentusecase = require("../application/usecases/update-comment.usecase");
const _deletecommentusecase = require("../application/usecases/delete-comment.usecase");
const _handlecommentlikeusecase = require("../application/usecases/handle-comment-like.usecase");
const _handlecommentlikeinputdto = require("./input-dto/handle-comment-like.input-dto");
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
let CommentsController = class CommentsController {
    async getComment(id, user) {
        return this.queryBus.execute(new _getcommentquery.GetCommentQuery(id, user?.userId));
    }
    async updateComment(body, commentId, user) {
        return this.commandBus.execute(new _updatecommentusecase.UpdateCommentCommand(commentId, user.userId, body.content));
    }
    async deleteComment(commentId, user) {
        return this.commandBus.execute(new _deletecommentusecase.DeleteCommentCommand(commentId, user.userId));
    }
    async handleLike(body, commentId, user) {
        return this.commandBus.execute(new _handlecommentlikeusecase.HandleCommentLikeCommand(user.userId, commentId, body.likeStatus));
    }
    constructor(queryBus, commandBus){
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
};
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
], CommentsController.prototype, "getComment", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(2, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatecommentinputdto.UpdateCommentInputDto === "undefined" ? Object : _updatecommentinputdto.UpdateCommentInputDto,
        String,
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], CommentsController.prototype, "updateComment", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Put)(':id/like-status'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(2, (0, _extractuserfromrequestdecorator.ExtractUserFromRequest)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _handlecommentlikeinputdto.HandleCommentLikeInputDto === "undefined" ? Object : _handlecommentlikeinputdto.HandleCommentLikeInputDto,
        String,
        typeof _usercontextdto.UserContextDto === "undefined" ? Object : _usercontextdto.UserContextDto
    ]),
    _ts_metadata("design:returntype", Promise)
], CommentsController.prototype, "handleLike", null);
CommentsController = _ts_decorate([
    (0, _common.Controller)('comments'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus,
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus
    ])
], CommentsController);

//# sourceMappingURL=comments.controller.js.map