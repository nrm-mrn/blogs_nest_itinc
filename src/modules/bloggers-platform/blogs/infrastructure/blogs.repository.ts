import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, BlogModelType } from '../domain/blog.entity';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}

  async save(blog: BlogDocument): Promise<string> {
    await blog.save();
    return blog._id.toString();
  }

  async findById(blogId: string): Promise<BlogDocument | null> {
    const blog = await this.BlogModel.findOne({
      _id: blogId,
      deletedAt: null,
    });
    return blog;
  }

  async findOrNotFoundFail(blogId: string): Promise<BlogDocument> {
    const blog = await this.BlogModel.findOne({
      _id: blogId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Blog not found',
      }),
    );
    return blog;
  }

  async deleteBlog(blog: BlogDocument) {
    blog.markDeleted();
    return this.save(blog);
  }
}
