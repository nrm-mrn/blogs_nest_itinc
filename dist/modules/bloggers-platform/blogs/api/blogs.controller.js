"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogsController", {
    enumerable: true,
    get: function() {
        return BlogsController;
    }
});
const _common = require("@nestjs/common");
const _blogsinputdto = require("./input-dto/blogs.input-dto");
const _getblogsqueryparamsinputdto = require("./input-dto/get-blogs-query-params.input-dto");
const _blogsqueryrepository = require("../infrastructure/blogs.query-repository");
const _blogservice = require("../application/blog.service");
const _objectidvalidationpipeservice = require("../../../../core/pipes/object-id-validation-pipe.service");
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
let BlogsController = class BlogsController {
    async getBlogs(query) {
        return this.blogsQueryRepository.getAllBlogs(query);
    }
    async createBlog(body) {
        const dto = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
        };
        const { blogId } = await this.blogsService.createBlog(dto);
        return this.blogsQueryRepository.findBlogOrNotFoundFail(blogId);
    }
    async getBlog(id) {
        return this.blogsQueryRepository.findBlogOrNotFoundFail(id);
    }
    async updateBlog(id, body) {
        const dto = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
        };
        await this.blogsService.editBlog(id, dto);
        return;
    }
    async deleteBlog(id) {
        return this.blogsService.deleteBlog(id);
    }
    constructor(blogsQueryRepository, blogsService){
        this.blogsQueryRepository = blogsQueryRepository;
        this.blogsService = blogsService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getblogsqueryparamsinputdto.GetBlogsQueryParams === "undefined" ? Object : _getblogsqueryparamsinputdto.GetBlogsQueryParams
    ]),
    _ts_metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blogsinputdto.CreateBlogInputDto === "undefined" ? Object : _blogsinputdto.CreateBlogInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlog", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _blogsinputdto.UpdateBlogInputDto === "undefined" ? Object : _blogsinputdto.UpdateBlogInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
BlogsController = _ts_decorate([
    (0, _common.Controller)('blogs'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blogsqueryrepository.BlogsQueryRepository === "undefined" ? Object : _blogsqueryrepository.BlogsQueryRepository,
        typeof _blogservice.BlogService === "undefined" ? Object : _blogservice.BlogService
    ])
], BlogsController);

//# sourceMappingURL=blogs.controller.js.map