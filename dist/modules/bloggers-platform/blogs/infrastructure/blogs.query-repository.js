"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogsQueryRepository", {
    enumerable: true,
    get: function() {
        return BlogsQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _blogentity = require("../domain/blog.entity");
const _mongoose = require("@nestjs/mongoose");
const _basepaginatedviewdto = require("../../../../core/dto/base.paginated.view-dto");
const _blogsviewdto = require("../api/view-dto/blogs.view-dto");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _postentity = require("../../posts/domain/post.entity");
const _postsviewdto = require("../../posts/api/view-dto/posts.view-dto");
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
let BlogsQueryRepository = class BlogsQueryRepository {
    getFilter(dto) {
        let byId = {};
        let search = {};
        if ('blogId' in dto) {
            byId = {
                blogId: dto.blogId
            };
        }
        if ('searchNameTerm' in dto && dto.searchNameTerm !== null) {
            search = {
                name: {
                    $regex: dto.searchNameTerm,
                    $options: 'i'
                }
            };
        }
        return {
            ...byId,
            ...search,
            deletedAt: null
        };
    }
    async getAllBlogs(dto) {
        const filter = this.getFilter(dto);
        const blogs = await this.BlogModel.find(filter).sort({
            [dto.sortBy]: dto.sortDirection
        }).skip(dto.calculateSkip()).limit(dto.pageSize).exec();
        const total = await this.BlogModel.countDocuments(filter).exec();
        const blogViews = blogs.map((blog)=>{
            return _blogsviewdto.BlogViewDto.mapToView(blog);
        });
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: blogViews,
            page: dto.pageNumber,
            size: dto.pageSize,
            totalCount: total
        });
    }
    async getBlogPosts(dto) {
        await this.findBlogOrNotFoundFail(dto.blogId);
        const filter = this.getFilter(dto);
        const posts = await this.PostModel.find(filter).sort({
            [dto.sortBy]: dto.sortDirection
        }).skip(dto.calculateSkip()).limit(dto.pageSize).exec();
        const total = await this.PostModel.countDocuments(filter);
        const postViews = posts.map((post)=>{
            return _postsviewdto.PostViewDto.mapToView(post);
        });
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: postViews,
            page: dto.pageNumber,
            size: dto.pageSize,
            totalCount: total
        });
    }
    async findBlogOrNotFoundFail(id) {
        const blog = await this.BlogModel.findOne({
            _id: id,
            deletedAt: null
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'Blog not found'
        }));
        return _blogsviewdto.BlogViewDto.mapToView(blog);
    }
    constructor(BlogModel, PostModel){
        this.BlogModel = BlogModel;
        this.PostModel = PostModel;
    }
};
BlogsQueryRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_blogentity.Blog.name)),
    _ts_param(1, (0, _mongoose.InjectModel)(_postentity.Post.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blogentity.BlogModelType === "undefined" ? Object : _blogentity.BlogModelType,
        typeof _postentity.PostModelType === "undefined" ? Object : _postentity.PostModelType
    ])
], BlogsQueryRepository);

//# sourceMappingURL=blogs.query-repository.js.map