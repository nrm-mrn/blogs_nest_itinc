"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogsRepository", {
    enumerable: true,
    get: function() {
        return BlogsRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _blogentity = require("../domain/blog.entity");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let BlogsRepository = class BlogsRepository {
    async save(blog) {
        await blog.save();
        return blog._id.toString();
    }
    async findById(blogId) {
        const blog = await this.BlogModel.findOne({
            _id: blogId,
            deletedAt: null
        });
        return blog;
    }
    async findOrNotFoundFail(blogId) {
        const blog = await this.BlogModel.findOne({
            _id: blogId,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Blog not found'
        }));
        return blog;
    }
    async deleteBlog(blog) {
        blog.markDeleted();
        return this.save(blog);
    }
    constructor(BlogModel){
        this.BlogModel = BlogModel;
    }
};
BlogsRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_blogentity.Blog.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blogentity.BlogModelType === "undefined" ? Object : _blogentity.BlogModelType
    ])
], BlogsRepository);

//# sourceMappingURL=blogs.repository.js.map