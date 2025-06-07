"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BloggersPlatformModule", {
    enumerable: true,
    get: function() {
        return BloggersPlatformModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _blogentity = require("./blogs/domain/blog.entity");
const _blogscontroller = require("./blogs/api/blogs.controller");
const _blogservice = require("./blogs/application/blog.service");
const _blogsqueryrepository = require("./blogs/infrastructure/blogs.query-repository");
const _blogsrepository = require("./blogs/infrastructure/blogs.repository");
const _useraccountsmodule = require("../user-accounts/user-accounts.module");
const _postscontroller = require("./posts/api/posts.controller");
const _postsservice = require("./posts/application/posts.service");
const _postsqueryrepository = require("./posts/infrastructure/posts.query-repository");
const _postsrepository = require("./posts/infrastructure/posts.repository");
const _postentity = require("./posts/domain/post.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BloggersPlatformModule = class BloggersPlatformModule {
};
BloggersPlatformModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _mongoose.MongooseModule.forFeature([
                {
                    name: _blogentity.Blog.name,
                    schema: _blogentity.BlogSchema
                }
            ]),
            _mongoose.MongooseModule.forFeature([
                {
                    name: _postentity.Post.name,
                    schema: _postentity.PostSchema
                }
            ]),
            _useraccountsmodule.UserAccountsModule
        ],
        controllers: [
            _blogscontroller.BlogsController,
            _postscontroller.PostsController
        ],
        providers: [
            _blogservice.BlogService,
            _blogsqueryrepository.BlogsQueryRepository,
            _blogsrepository.BlogsRepository,
            _postsservice.PostsService,
            _postsqueryrepository.PostsQueryRepository,
            _postsrepository.PostsRepository
        ]
    })
], BloggersPlatformModule);

//# sourceMappingURL=bloggers-platform.module.js.map