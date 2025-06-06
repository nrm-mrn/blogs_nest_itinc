import { Injectable } from '@nestjs/common';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsRepository } from '../infrastructure/blogs.repository';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly BlogModel: BlogModelType,
    private readonly blogRepository: BlogsRepository,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<{ blogId: string }> {
    const newBlog = this.BlogModel.createBlog(dto);
    const blogId = await this.blogRepository.save(newBlog);
    return { blogId };
  }

  async editBlog(id: string, dto: UpdateBlogDto): Promise<void> {
    const blog = await this.blogRepository.findOrNotFoundFail(id);
    //TODO: update post once entity is there
    // if (blog.name !== input.name) {
    //   await this.postsService.editPostsByBlogId(
    //     { id, blogName: input.name }
    //   )
    // }
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    await this.blogRepository.save(blog);
    return;
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findOrNotFoundFail(id);
    await this.blogRepository.deleteBlog(blog);
    //TODO: cascade delete posts
    // await this.postsService.deletePostsByBlogId(id);
  }
}
