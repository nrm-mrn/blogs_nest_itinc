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
    get Comment () {
        return Comment;
    },
    get CommentSchema () {
        return CommentSchema;
    },
    get commentContentConstr () {
        return commentContentConstr;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _commentatorinfoschema = require("./commentator-info.schema");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const commentContentConstr = {
    minLength: 20,
    maxLength: 300
};
let Comment = class Comment {
    static createComment(dto) {
        const comment = new this();
        comment.postId = dto.postId;
        comment.content = dto.content;
        comment.commentatorInfo.userId = dto.userId;
        comment.commentatorInfo.userLogin = dto.userLogin;
        comment.likesCount = 0;
        comment.dislikesCount = 0;
        return comment;
    }
    updateComment(dto) {
        this.content = dto.content;
    }
    markDeleted() {
        if (this.deletedAt !== null) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.NotFound,
                message: 'Entity is already deleted'
            });
        }
        this.deletedAt = new Date();
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], Comment.prototype, "postId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...commentContentConstr
    }),
    _ts_metadata("design:type", String)
], Comment.prototype, "content", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _commentatorinfoschema.CommentatorInfoSchema,
        required: true
    }),
    _ts_metadata("design:type", typeof _commentatorinfoschema.CommentatorInfo === "undefined" ? Object : _commentatorinfoschema.CommentatorInfo)
], Comment.prototype, "commentatorInfo", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Number,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Comment.prototype, "likesCount", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Number,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], Comment.prototype, "dislikesCount", void 0);
Comment = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], Comment);
const CommentSchema = _mongoose.SchemaFactory.createForClass(Comment);
CommentSchema.loadClass(Comment);

//# sourceMappingURL=comment.entity.js.map