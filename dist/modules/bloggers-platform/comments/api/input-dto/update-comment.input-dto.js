"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateCommentInputDto", {
    enumerable: true,
    get: function() {
        return UpdateCommentInputDto;
    }
});
const _isstringwithtrim = require("../../../../../core/decorators/validators/is-string-with-trim");
const _createcommentforpostinputdto = require("../../../posts/api/input-dto/create-comment-for-post.input-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateCommentInputDto = class UpdateCommentInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_createcommentforpostinputdto.commentContentConst.minLength, _createcommentforpostinputdto.commentContentConst.maxLength),
    _ts_metadata("design:type", String)
], UpdateCommentInputDto.prototype, "content", void 0);

//# sourceMappingURL=update-comment.input-dto.js.map