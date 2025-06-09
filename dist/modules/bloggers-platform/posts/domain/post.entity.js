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
    get Post () {
        return Post;
    },
    get PostSchema () {
        return PostSchema;
    },
    get postContentConstr () {
        return postContentConstr;
    },
    get postDescriptionConstr () {
        return postDescriptionConstr;
    },
    get postTitleConstr () {
        return postTitleConstr;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _extendedLikesschema = require("./extendedLikes.schema");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const postTitleConstr = {
    maxLength: 30
};
const postDescriptionConstr = {
    maxLength: 100
};
const postContentConstr = {
    maxLength: 1000
};
let Post = class Post {
    /**
   * Creates post instance from provided dto
   * @param {CreatePostDomainDto} dto
   */ static createPost(dto) {
        const post = new this();
        post.title = dto.title;
        post.shortDescription = dto.shortDescription;
        post.content = dto.content;
        post.blogId = dto.blogId;
        post.blogName = dto.blogName;
        // post.extendedLikesInfo = {
        //   likesCount: 0,
        //   dislikesCount: 0,
        //   newestLikes: [],
        // };
        return post;
    }
    /**
   * Updates fields in post instance with provided values
   * @param {UpdatePostDto} dto
   */ updatePost(dto) {
        this.title = dto.title;
        this.shortDescription = dto.shortDescription;
        this.content = dto.content;
        this.blogId = dto.blogId;
        return;
    }
    /**
   * Marks the post as deleted
   * @throws {DomainException} if already deleted
   */ markDeleted() {
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
        required: true,
        ...postTitleConstr
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "title", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...postDescriptionConstr
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "shortDescription", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...postContentConstr
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "content", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "blogId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _extendedLikesschema.ExtendedLikesInfoSchema,
        default: new _extendedLikesschema.ExtendedLikesInfo()
    }),
    _ts_metadata("design:type", typeof _extendedLikesschema.ExtendedLikesInfo === "undefined" ? Object : _extendedLikesschema.ExtendedLikesInfo)
], Post.prototype, "extendedLikesInfo", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], Post.prototype, "blogName", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Date,
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], Post.prototype, "deletedAt", void 0);
Post = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], Post);
const PostSchema = _mongoose.SchemaFactory.createForClass(Post);
PostSchema.loadClass(Post);

//# sourceMappingURL=post.entity.js.map