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
    get Blog () {
        return Blog;
    },
    get BlogSchema () {
        return BlogSchema;
    },
    get blogDescriptionConstraints () {
        return blogDescriptionConstraints;
    },
    get blogNameConstraints () {
        return blogNameConstraints;
    },
    get blogUrlConstraint () {
        return blogUrlConstraint;
    }
});
const _mongoose = require("@nestjs/mongoose");
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
const blogNameConstraints = {
    minLength: 1,
    maxLength: 15
};
const blogDescriptionConstraints = {
    maxLength: 500
};
const blogUrlConstraint = {
    maxLength: 100
};
let Blog = class Blog {
    /**
   * Creates blog instans from provided dto
   * @param {CreateBlogDto} - data transfer object for blog creation
   */ static createBlog(dto) {
        const blog = new this();
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
        return blog;
    }
    /**
   * Updates blog instance from provided dto rewriting values from dto
   * @param {UpdateBlogDto} - data transfer object for blog update
   */ updateBlog(dto) {
        this.name = dto.name;
        this.description = dto.description;
        this.websiteUrl = dto.websiteUrl;
        return;
    }
    /**
   * Marks the blog as deleted
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
        ...blogNameConstraints
    }),
    _ts_metadata("design:type", String)
], Blog.prototype, "name", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...blogDescriptionConstraints
    }),
    _ts_metadata("design:type", String)
], Blog.prototype, "description", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...blogUrlConstraint
    }),
    _ts_metadata("design:type", String)
], Blog.prototype, "websiteUrl", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Boolean,
        required: true,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], Blog.prototype, "isMembership", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Date,
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], Blog.prototype, "deletedAt", void 0);
Blog = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], Blog);
const BlogSchema = _mongoose.SchemaFactory.createForClass(Blog);
BlogSchema.loadClass(Blog);

//# sourceMappingURL=blog.entity.js.map