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
    get CreateBlogInputDto () {
        return CreateBlogInputDto;
    },
    get UpdateBlogInputDto () {
        return UpdateBlogInputDto;
    }
});
const _isstringwithtrim = require("../../../../../core/decorators/validators/is-string-with-trim");
const _blogentity = require("../../domain/blog.entity");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateBlogInputDto = class CreateBlogInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_blogentity.blogNameConstraints.minLength, _blogentity.blogNameConstraints.maxLength),
    _ts_metadata("design:type", String)
], CreateBlogInputDto.prototype, "name", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _blogentity.blogDescriptionConstraints.maxLength),
    _ts_metadata("design:type", String)
], CreateBlogInputDto.prototype, "description", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _blogentity.blogUrlConstraint.maxLength),
    (0, _classvalidator.IsUrl)(),
    _ts_metadata("design:type", String)
], CreateBlogInputDto.prototype, "websiteUrl", void 0);
let UpdateBlogInputDto = class UpdateBlogInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_blogentity.blogNameConstraints.minLength, _blogentity.blogNameConstraints.maxLength),
    _ts_metadata("design:type", String)
], UpdateBlogInputDto.prototype, "name", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _blogentity.blogDescriptionConstraints.maxLength),
    _ts_metadata("design:type", String)
], UpdateBlogInputDto.prototype, "description", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(0, _blogentity.blogUrlConstraint.maxLength),
    (0, _classvalidator.IsUrl)(),
    _ts_metadata("design:type", String)
], UpdateBlogInputDto.prototype, "websiteUrl", void 0);

//# sourceMappingURL=blogs.input-dto.js.map