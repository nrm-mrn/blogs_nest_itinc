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
    get CreateCommentForPostInputDto () {
        return CreateCommentForPostInputDto;
    },
    get commentContentConst () {
        return commentContentConst;
    }
});
const _isstringwithtrim = require("../../../../../core/decorators/validators/is-string-with-trim");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const commentContentConst = {
    minLength: 20,
    maxLength: 300
};
let CreateCommentForPostInputDto = class CreateCommentForPostInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(commentContentConst.minLength, commentContentConst.maxLength),
    _ts_metadata("design:type", String)
], CreateCommentForPostInputDto.prototype, "content", void 0);

//# sourceMappingURL=create-comment-for-post.input-dto.js.map