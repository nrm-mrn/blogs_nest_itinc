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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
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
  ],
})
export class BloggersPlatformModule {}
