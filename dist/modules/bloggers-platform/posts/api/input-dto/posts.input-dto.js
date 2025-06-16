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
    get CreatePostInputDto () {
        return CreatePostInputDto;
    },
    get UpdatePostInputDto () {
        return UpdatePostInputDto;
    }
});
const _isstringwithtrim = require("../../../../../core/decorators/validators/is-string-with-trim");
const _postentity = require("../../domain/post.entity");
const _isvalidobjectid = require("../../../../../core/decorators/validators/is-valid-object-id");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreatePostInputDto = class CreatePostInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postTitleConstr.maxLength),
    _ts_metadata("design:type", String)
], CreatePostInputDto.prototype, "title", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postDescriptionConstr.maxLength),
    _ts_metadata("design:type", String)
], CreatePostInputDto.prototype, "shortDescription", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postContentConstr.maxLength),
    _ts_metadata("design:type", String)
], CreatePostInputDto.prototype, "content", void 0);
_ts_decorate([
    (0, _isvalidobjectid.IsValidObjectId)(),
    _ts_metadata("design:type", String)
], CreatePostInputDto.prototype, "blogId", void 0);
let UpdatePostInputDto = class UpdatePostInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postTitleConstr.maxLength),
    _ts_metadata("design:type", String)
], UpdatePostInputDto.prototype, "title", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postDescriptionConstr.maxLength),
    _ts_metadata("design:type", String)
], UpdatePostInputDto.prototype, "shortDescription", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(1, _postentity.postContentConstr.maxLength),
    _ts_metadata("design:type", String)
], UpdatePostInputDto.prototype, "content", void 0);
_ts_decorate([
    (0, _isvalidobjectid.IsValidObjectId)(),
    _ts_metadata("design:type", String)
], UpdatePostInputDto.prototype, "blogId", void 0);

//# sourceMappingURL=posts.input-dto.js.map