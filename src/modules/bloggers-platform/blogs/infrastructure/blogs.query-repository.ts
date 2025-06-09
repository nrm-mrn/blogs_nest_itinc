import { Injectable } from '@nestjs/common';
import { Blog, BlogDocument, BlogModelType } from '../domain/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { GetBlogsQueryParams } from '../api/input-dto/get-blogs-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { BlogViewDto } from '../api/view-dto/blogs.view-dto';
import { FilterQuery } from 'mongoose';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { Post, PostModelType } from '../../posts/domain/post.entity';
import { GetBlogPostsDto } from '../api/view-dto/get-blog-posts-dto';
import { PostViewDto } from '../../posts/api/view-dto/posts.view-dto';

@Injectable()
export class BlogsQueryRepository {
  constructor(
    @InjectModel(Blog.name) private readonly BlogModel: BlogModelType,
    @InjectModel(Post.name) private readonly PostModel: PostModelType,
  ) {}

  getFilter(
    dto: GetBlogsQueryParams | GetBlogPostsDto,
  ): FilterQuery<BlogDocument> {
    let byId = {};
    let search = {};
    if ('blogId' in dto) {
      byId = { blogId: dto.blogId };
    }
    if ('searchNameTerm' in dto && dto.searchNameTerm !== null) {
      search = { name: { $regex: dto.searchNameTerm, $options: 'i' } };
    }
    return { ...byId, ...search, deletedAt: null };
  }

  async getAllBlogs(
    dto: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    const filter = this.getFilter(dto);
    const blogs = await this.BlogModel.find(filter)
      .sort({ [dto.sortBy]: dto.sortDirection })
      .skip(dto.calculateSkip())
      .limit(dto.pageSize)
      .exec();
    const total = await this.BlogModel.countDocuments(filter).exec();
    const blogViews: BlogViewDto[] = blogs.map((blog) => {
      return BlogViewDto.mapToView(blog);
    });

    return PaginatedViewDto.mapToView({
      items: blogViews,
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: total,
    });
  }

  async getBlogPosts(
    dto: GetBlogPostsDto,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    await this.findBlogOrNotFoundFail(dto.blogId);
    const filter = this.getFilter(dto);
    const posts = await this.PostModel.find(filter)
      .sort({ [dto.sortBy]: dto.sortDirection })
      .skip(dto.calculateSkip())
      .limit(dto.pageSize)
      .exec();
    const total = await this.PostModel.countDocuments(filter);
    const postViews: PostViewDto[] = posts.map((post) => {
      return PostViewDto.mapToView(post);
    });
    return PaginatedViewDto.mapToView({
      items: postViews,
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: total,
    });
  }

  async findBlogOrNotFoundFail(id: string): Promise<BlogViewDto> {
    const blog = await this.BlogModel.findOne({
      _id: id,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Blog not found',
      }),
    );
    return BlogViewDto.mapToView(blog);
  }
}
