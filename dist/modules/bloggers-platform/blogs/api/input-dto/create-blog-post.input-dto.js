"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateBlogPostInputDto", {
    enumerable: true,
    get: function() {
        return CreateBlogPostInputDto;
    }
});
const _isstringwithtrim = require("../../../../../core/decorators/validators/is-string-with-trim");
const _postentity = require("../../../posts/domain/post.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateBlogPostInputDto = class CreateBlogPostInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _postentity.postTitleConstr.maxLength),
    _ts_metadata("design:type", String)
], CreateBlogPostInputDto.prototype, "title", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _postentity.postDescriptionConstr.maxLength),
    _ts_metadata("design:type", String)
], CreateBlogPostInputDto.prototype, "shortDescription", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _postentity.postContentConstr.maxLength),
    _ts_metadata("design:type", String)
], CreateBlogPostInputDto.prototype, "content", void 0);

//# sourceMappingURL=create-blog-post.input-dto.js.map