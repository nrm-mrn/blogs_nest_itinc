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
    get LikeStatus () {
        return LikeStatus;
    },
    get PostLike () {
        return PostLike;
    },
    get PostLikeSchema () {
        return PostLikeSchema;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _postsviewdto = require("../api/view-dto/posts.view-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var LikeStatus = /*#__PURE__*/ function(LikeStatus) {
    LikeStatus["LIKE"] = "Like";
    LikeStatus["DISLIKE"] = "Dislike";
    LikeStatus["NONE"] = "None";
    return LikeStatus;
}({});
let PostLike = class PostLike {
    static createLike(dto) {
        const like = new this();
        like.postId = dto.postId;
        like.userId = dto.userId;
        like.login = dto.login;
        like.status = dto.status;
        return like;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], PostLike.prototype, "postId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], PostLike.prototype, "userId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], PostLike.prototype, "login", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        enum: _postsviewdto.PostLikeStatus,
        required: true
    }),
    _ts_metadata("design:type", typeof _postsviewdto.PostLikeStatus === "undefined" ? Object : _postsviewdto.PostLikeStatus)
], PostLike.prototype, "status", void 0);
PostLike = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], PostLike);
const PostLikeSchema = _mongoose.SchemaFactory.createForClass(PostLike);
PostLikeSchema.loadClass(PostLike);

//# sourceMappingURL=postLike.entity.js.map