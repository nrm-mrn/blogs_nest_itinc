import { Injectable } from '@nestjs/common';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsRepository } from '../infrastructure/blogs.repository';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { PostsService } from '../../posts/application/posts.service';
import { UpdatePostsByBlog } from '../../posts/dto/update-posts-by-blog.dto';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly BlogModel: BlogModelType,
    private readonly blogRepository: BlogsRepository,
    private readonly postsService: PostsService,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<{ blogId: string }> {
    const newBlog = this.BlogModel.createBlog(dto);
    const blogId = await this.blogRepository.save(newBlog);
    return { blogId };
  }

  async createPostForBlog(dto: CreateBlogPostDto): Promise<{ postId: string }> {
    return this.postsService.createPost(dto);
  }

  async editBlog(id: string, dto: UpdateBlogDto): Promise<void> {
    const blog = await this.blogRepository.findOrNotFoundFail(id);
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    await this.blogRepository.save(blog);
    if (blog.name !== dto.name) {
      const update: UpdatePostsByBlog = {
        blogId: id,
        blogName: dto.name,
      };
      await this.postsService.updatePostsByBlogId(update);
    }
    return;
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findOrNotFoundFail(id);
    await this.blogRepository.deleteBlog(blog);
    await this.postsService.deletePostsByBlogId(id);
  }
}
