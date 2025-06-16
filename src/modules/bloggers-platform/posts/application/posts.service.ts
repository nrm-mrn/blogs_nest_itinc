import { Injectable } from '@nestjs/common';
import { BlogDocument } from '../../blogs/domain/blog.entity';
import { Post, PostDocument, PostModelType } from '../domain/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsRepository } from '../infrastructure/posts.repository';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository';
import {
  DomainException,
  Extension,
} from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdatePostsByBlog } from '../dto/update-posts-by-blog.dto';
import { CreatePostDomainDto } from '../domain/dto/create-post-domain-dto';
import { HandlePostLikeDto } from '../dto/handle-post-like.dto';
import { PostLikeStatus } from '../api/view-dto/posts.view-dto';
import {
  PostLike,
  PostLikeDocument,
  PostLikeModelType,
} from '../domain/postLike.entity';
import { UsersExternalService } from 'src/modules/user-accounts/application/users.external-service';
import { CreatePostLikeDomainDto } from '../domain/dto/create-post-like-domain-dto';
import { CommentsRepository } from '../../comments/infrastructure/comments.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
    @InjectModel(PostLike.name)
    private readonly PostLikeModel: PostLikeModelType,
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly blogRepository: BlogsRepository,
    private readonly usersService: UsersExternalService,
  ) {}
  async getParentBlog(blogId: string): Promise<BlogDocument> {
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) {
      throw new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Wrong blogid',
        extensions: [new Extension('wrong blogId', 'blogId')],
      });
    }
    return blog;
  }

  async createPost(input: CreatePostDto): Promise<{ postId: string }> {
    const blog = await this.getParentBlog(input.blogId);
    const dto: CreatePostDomainDto = { ...input, blogName: blog.name };
    const newPost = this.PostModel.createPost(dto);
    const postId = await this.postsRepository.save(newPost);
    return { postId };
  }

  async editPost(id: string, input: UpdatePostDto): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(id);
    post.updatePost(input);
    await this.postsRepository.save(post);
    return;
  }

  async updatePostsByBlogId(update: UpdatePostsByBlog): Promise<void> {
    return this.postsRepository.updatePostsByBlogId(update);
  }

  async deletePostsByBlogId(id: string): Promise<void> {
    const postIds = await this.postsRepository.findPostIdsByBlog(id);
    await Promise.all([
      this.postsRepository.deletePostsByBlogId(id),
      this.commentsRepository.deleteCommentsForPosts(postIds),
    ]);
    return;
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(id);
    await Promise.all([
      this.postsRepository.deletePost(post),
      this.commentsRepository.deleteCommentsByPost(post._id.toString()),
    ]);
    return;
  }

  async handlePostLike(likeDto: HandlePostLikeDto): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(likeDto.postId);
    const postLike = await this.postsRepository.findPostLikeByUserId(
      post._id.toString(),
      likeDto.userId,
    );
    const user = await this.usersService.findUserById(likeDto.userId);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'User not found by id for post like',
      });
    }
    const dto: CreatePostLikeDomainDto = {
      ...likeDto,
      login: user.login,
    };
    if (!postLike) {
      return this.createNewLikeDoc(dto, post);
    }
    return this.updateLikeStatus(dto, postLike, post);
  }

  private async createNewLikeDoc(
    dto: CreatePostLikeDomainDto,
    post: PostDocument,
  ) {
    if (dto.status === PostLikeStatus.NONE) {
      return;
    }
    switch (dto.status) {
      case PostLikeStatus.LIKE: {
        post.addLike();
        break;
      }
      case PostLikeStatus.DISLIKE: {
        post.addDislike();
        break;
      }
    }
    const postLike = this.PostLikeModel.createLike(dto);
    if (PostLikeStatus.LIKE) {
      await this.postsRepository.save(postLike);
      const recentLikes = await this.postsRepository.getRecentLikeDocsForPost(
        dto.postId,
        PostLikeStatus.LIKE,
      );
      post.updateNewestLikes(recentLikes);
      await this.postsRepository.save(post);
      return;
    }
    await Promise.all([
      this.postsRepository.save(post),
      this.postsRepository.save(postLike),
    ]);
    return;
  }

  private async updateLikeStatus(
    dto: CreatePostLikeDomainDto,
    like: PostLikeDocument,
    post: PostDocument,
  ) {
    if (like.status === dto.status) {
      return;
    }
    switch (dto.status) {
      case PostLikeStatus.LIKE: {
        post.addLike();
        if (like.status === PostLikeStatus.DISLIKE) {
          post.removeDislike();
        }
        break;
      }
      case PostLikeStatus.DISLIKE: {
        post.addDislike();
        if (like.status === PostLikeStatus.LIKE) {
          post.removeLike();
        }
        break;
      }
      case PostLikeStatus.NONE: {
        if (like.status === PostLikeStatus.LIKE) {
          post.removeLike();
          break;
        }
        post.removeDislike();
        break;
      }
    }
    like.status = dto.status;
    //NOTE: the only case when LIKEs do not change
    if (
      dto.status === PostLikeStatus.NONE &&
      like.status !== PostLikeStatus.LIKE
    ) {
      await Promise.all([
        this.postsRepository.save(post),
        this.postsRepository.save(like),
      ]);
      return;
    }

    await this.postsRepository.save(like);
    const recentLikes = await this.postsRepository.getRecentLikeDocsForPost(
      dto.postId,
      PostLikeStatus.LIKE,
    );
    post.updateNewestLikes(recentLikes);
    await this.postsRepository.save(post);
    return;
  }
}
