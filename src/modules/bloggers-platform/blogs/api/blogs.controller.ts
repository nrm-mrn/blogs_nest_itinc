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

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsQueryRepository: BlogsQueryRepository,
    private readonly blogsService: BlogService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBlogs(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAllBlogs(query);
  }

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBlog(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<BlogViewDto> {
    return this.blogsQueryRepository.findBlogOrNotFoundFail(id);
  }

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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    return this.blogsService.deleteBlog(id);
  }
}
