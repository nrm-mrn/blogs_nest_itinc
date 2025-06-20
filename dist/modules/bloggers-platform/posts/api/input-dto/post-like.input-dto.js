"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostLikeInputDto", {
    enumerable: true,
    get: function() {
        return PostLikeInputDto;
    }
});
const _classvalidator = require("class-validator");
const _postsviewdto = require("../view-dto/posts.view-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PostLikeInputDto = class PostLikeInputDto {
};
_ts_decorate([
    (0, _classvalidator.IsEnum)(_postsviewdto.PostLikeStatus),
    _ts_metadata("design:type", typeof _postsviewdto.PostLikeStatus === "undefined" ? Object : _postsviewdto.PostLikeStatus)
], PostLikeInputDto.prototype, "likeStatus", void 0);

//# sourceMappingURL=post-like.input-dto.js.map