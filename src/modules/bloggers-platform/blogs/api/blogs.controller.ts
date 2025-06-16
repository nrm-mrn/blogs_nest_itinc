import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogViewDto } from './view-dto/blogs.view-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import {
  CreateBlogInputDto,
  UpdateBlogInputDto,
} from './input-dto/blogs.input-dto';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.input-dto';
import { BlogsQueryRepository } from '../infrastructure/blogs.query-repository';
import { BlogService } from '../application/blog.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';
import { CreateBlogPostInputDto } from './input-dto/create-blog-post.input-dto';
import { CreateBlogPostDto } from '../dto/create-blog-post.dto';
import { PostsQueryRepository } from '../../posts/infrastructure/posts.query-repository';
import { PostViewDto } from '../../posts/api/view-dto/posts.view-dto';
import { GetBlogPostsDto } from './view-dto/get-blog-posts-dto';
import { GetBlogPostsQueryParams } from './input-dto/get-blog-posts-query-params.input-dto';
import { BasicAuthGuard } from 'src/modules/user-accounts/guards/basic/basic-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsQueryRepository: BlogsQueryRepository,
    private readonly postsQueryRepository: PostsQueryRepository,
    private readonly blogsService: BlogService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBlogs(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAllBlogs(query);
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() body: CreateBlogInputDto): Promise<BlogViewDto> {
    const dto: CreateBlogDto = {
      name: body.name,
      description: body.description,
      websiteUrl: body.websiteUrl,
    };
    const { blogId } = await this.blogsService.createBlog(dto);
    return this.blogsQueryRepository.findBlogOrNotFoundFail(blogId);
  }

  @UseGuards(BasicAuthGuard)
  @Post(':blogId/posts')
  @HttpCode(HttpStatus.CREATED)
  async createPostForBlog(
    @Param('blogId', ObjectIdValidationPipe) blogId: string,
    @Body() body: CreateBlogPostInputDto,
  ): Promise<PostViewDto> {
    const dto: CreateBlogPostDto = {
      blogId,
      title: body.title,
      content: body.content,
      shortDescription: body.shortDescription,
    };
    const { postId } = await this.blogsService.createPostForBlog(dto);
    return this.postsQueryRepository.findPostOrNotFoundFail(postId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBlog(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<BlogViewDto> {
    return this.blogsQueryRepository.findBlogOrNotFoundFail(id);
  }

  @Get(':blogId/posts')
  @HttpCode(HttpStatus.OK)
  async getPostsForBlog(
    @Param('blogId', ObjectIdValidationPipe) blogId: string,
    @Query() query: GetBlogPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const dto: GetBlogPostsDto = Object.assign(new GetBlogPostsDto(), query, {
      blogId,
    });
    return this.blogsQueryRepository.getBlogPosts(dto);
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() body: UpdateBlogInputDto,
  ): Promise<void> {
    const dto: UpdateBlogDto = {
      name: body.name,
      description: body.description,
      websiteUrl: body.websiteUrl,
    };
    await this.blogsService.editBlog(id, dto);
    return;
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    return this.blogsService.deleteBlog(id);
  }
}
