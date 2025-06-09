import { Injectable } from '@nestjs/common';
import { BlogDocument } from '../../blogs/domain/blog.entity';
import { Post, PostModelType } from '../domain/post.entity';
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

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
    private readonly postsRepository: PostsRepository,
    private readonly blogRepository: BlogsRepository,
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
    return this.postsRepository.deletePostsByBlogId(id);
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postsRepository.findOrNotFoundFail(id);
    await this.postsRepository.deletePost(post);
    // if (res) {
    //   await Promise.all([
    //     this.postsRepository.deleteLikesByPost(id),
    //     this.commentsService.deleteCommentsByPost(id),
    //   ]);
    //   return;
    // }
    // throw new Error('Failed to delete a post');
  }
}
