import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/domain/blog.entity';
import { BlogsController } from './blogs/api/blogs.controller';
import { BlogService } from './blogs/application/blog.service';
import { BlogsQueryRepository } from './blogs/infrastructure/blogs.query-repository';
import { BlogsRepository } from './blogs/infrastructure/blogs.repository';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { PostsController } from './posts/api/posts.controller';
import { PostsService } from './posts/application/posts.service';
import { PostsQueryRepository } from './posts/infrastructure/posts.query-repository';
import { PostsRepository } from './posts/infrastructure/posts.repository';
import { Post, PostSchema } from './posts/domain/post.entity';
import { CommentsController } from './comments/api/comments.controller';
import { CommentsQueryRepository } from './comments/infrastructure/comments.query-repository';
import { Comment, CommentSchema } from './comments/domain/comment.entity';
import { PostLike, PostLikeSchema } from './posts/domain/postLike.entity';
import { CommentsRepository } from './comments/infrastructure/comments.repository';
import { GetCommentQueryHandler } from './comments/application/queries/get-comment.query';
import { GetCommentsByPostQueryHandler } from './comments/application/queries/get-comments-for-post.query';
import { CreateCommentCommandHandler } from './comments/application/usecases/create-comment.usecase';
import { UpdateCommentCommandHandler } from './comments/application/usecases/update-comment.usecase';
import { DeleteCommentCommandHandler } from './comments/application/usecases/delete-comment.usecase';
import { CommentLikeCommandHandler } from './comments/application/usecases/handle-comment-like.usecase';
import {
  CommentLike,
  CommentLikeSchema,
} from './comments/domain/comment-like.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: PostLike.name, schema: PostLikeSchema },
    ]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([
      { name: CommentLike.name, schema: CommentLikeSchema },
    ]),
    UserAccountsModule,
  ],
  controllers: [BlogsController, PostsController, CommentsController],
  providers: [
    BlogService,
    BlogsQueryRepository,
    BlogsRepository,
    PostsService,
    PostsQueryRepository,
    PostsRepository,
    CommentsQueryRepository,
    CommentsRepository,
    GetCommentQueryHandler,
    GetCommentsByPostQueryHandler,
    CreateCommentCommandHandler,
    UpdateCommentCommandHandler,
    DeleteCommentCommandHandler,
    CommentLikeCommandHandler,
  ],
})
export class BloggersPlatformModule {}
