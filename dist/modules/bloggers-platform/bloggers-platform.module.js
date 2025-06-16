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
const _commentscontroller = require("./comments/api/comments.controller");
const _commentsqueryrepository = require("./comments/infrastructure/comments.query-repository");
const _commententity = require("./comments/domain/comment.entity");
const _postLikeentity = require("./posts/domain/postLike.entity");
const _commentsrepository = require("./comments/infrastructure/comments.repository");
const _getcommentquery = require("./comments/application/queries/get-comment.query");
const _getcommentsforpostquery = require("./comments/application/queries/get-comments-for-post.query");
const _createcommentusecase = require("./comments/application/usecases/create-comment.usecase");
const _updatecommentusecase = require("./comments/application/usecases/update-comment.usecase");
const _deletecommentusecase = require("./comments/application/usecases/delete-comment.usecase");
const _handlecommentlikeusecase = require("./comments/application/usecases/handle-comment-like.usecase");
const _commentlikeentity = require("./comments/domain/comment-like.entity");
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
            _mongoose.MongooseModule.forFeature([
                {
                    name: _postLikeentity.PostLike.name,
                    schema: _postLikeentity.PostLikeSchema
                }
            ]),
            _mongoose.MongooseModule.forFeature([
                {
                    name: _commententity.Comment.name,
                    schema: _commententity.CommentSchema
                }
            ]),
            _mongoose.MongooseModule.forFeature([
                {
                    name: _commentlikeentity.CommentLike.name,
                    schema: _commentlikeentity.CommentLikeSchema
                }
            ]),
            _useraccountsmodule.UserAccountsModule
        ],
        controllers: [
            _blogscontroller.BlogsController,
            _postscontroller.PostsController,
            _commentscontroller.CommentsController
        ],
        providers: [
            _blogservice.BlogService,
            _blogsqueryrepository.BlogsQueryRepository,
            _blogsrepository.BlogsRepository,
            _postsservice.PostsService,
            _postsqueryrepository.PostsQueryRepository,
            _postsrepository.PostsRepository,
            _commentsqueryrepository.CommentsQueryRepository,
            _commentsrepository.CommentsRepository,
            _getcommentquery.GetCommentQueryHandler,
            _getcommentsforpostquery.GetCommentsByPostQueryHandler,
            _createcommentusecase.CreateCommentCommandHandler,
            _updatecommentusecase.UpdateCommentCommandHandler,
            _deletecommentusecase.DeleteCommentCommandHandler,
            _handlecommentlikeusecase.CommentLikeCommandHandler
        ]
    })
], BloggersPlatformModule);

//# sourceMappingURL=bloggers-platform.module.js.map