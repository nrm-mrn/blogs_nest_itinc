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
    get CommentLike () {
        return CommentLike;
    },
    get CommentLikeSchema () {
        return CommentLikeSchema;
    },
    get CommentLikeStatus () {
        return CommentLikeStatus;
    }
});
const _mongoose = require("@nestjs/mongoose");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var CommentLikeStatus = /*#__PURE__*/ function(CommentLikeStatus) {
    CommentLikeStatus["LIKE"] = "Like";
    CommentLikeStatus["DISLIKE"] = "Dislike";
    CommentLikeStatus["NONE"] = "None";
    return CommentLikeStatus;
}({});
let CommentLike = class CommentLike {
    static createLike(dto) {
        const like = new this();
        like.commentId = dto.commentId;
        like.userId = dto.userId;
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
], CommentLike.prototype, "commentId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], CommentLike.prototype, "userId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        enum: CommentLikeStatus,
        required: true
    }),
    _ts_metadata("design:type", String)
], CommentLike.prototype, "status", void 0);
CommentLike = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], CommentLike);
const CommentLikeSchema = _mongoose.SchemaFactory.createForClass(CommentLike);
CommentLikeSchema.loadClass(CommentLike);

//# sourceMappingURL=comment-like.entity.js.map