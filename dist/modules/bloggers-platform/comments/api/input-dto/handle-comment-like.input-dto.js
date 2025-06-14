"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HandleCommentLikeInputDto", {
    enumerable: true,
    get: function() {
        return HandleCommentLikeInputDto;
    }
});
const _classvalidator = require("class-validator");
const _commentlikeentity = require("../../domain/comment-like.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let HandleCommentLikeInputDto = class HandleCommentLikeInputDto {
};
_ts_decorate([
    (0, _classvalidator.IsEnum)(_commentlikeentity.CommentLikeStatus),
    _ts_metadata("design:type", typeof _commentlikeentity.CommentLikeStatus === "undefined" ? Object : _commentlikeentity.CommentLikeStatus)
], HandleCommentLikeInputDto.prototype, "likeStatus", void 0);

//# sourceMappingURL=handle-comment-like.input-dto.js.map