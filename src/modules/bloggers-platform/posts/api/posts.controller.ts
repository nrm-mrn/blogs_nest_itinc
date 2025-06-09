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
import { PostsQueryRepository } from '../infrastructure/posts.query-repository';
import { PostsService } from '../application/posts.service';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { PostViewDto } from './view-dto/posts.view-dto';
import {
  CreatePostInputDto,
  UpdatePostInputDto,
} from './input-dto/posts.input-dto';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsQueryRepo: PostsQueryRepository,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPosts(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQueryRepo.getAllPosts(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() query: CreatePostInputDto): Promise<PostViewDto> {
    const postId = await this.postsService.createPost(query);
    return this.postsQueryRepo.findPostOrNotFoundFail(postId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPost(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<PostViewDto> {
    return this.postsQueryRepo.findPostOrNotFoundFail(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editPost(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() query: UpdatePostInputDto,
  ): Promise<void> {
    return this.postsService.editPost(id, query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    return this.postsService.deletePost(id);
  }

  // async createCommentForPost(
  //   req: RequestWithParamsBodyAndUserId<
  //     { id: string },
  //     CommentInputModel,
  //     { id: string }
  //   >,
  //   res: Response<ICommentView>,
  //   next: NextFunction,
  // ) {
  //   const postId = req.params.id as unknown as ObjectId;
  //   const userId = req.user!.id;
  //   const input: CreateCommentDto = {
  //     postId,
  //     userId,
  //     content: req.body.content,
  //   };
  //   try {
  //     const commentId = await this.commentsService.createComment(input);
  //     const comment = await this.commentsQueryRepo.getCommentById(commentId);
  //     res.status(HttpStatuses.Created).send(comment);
  //     return;
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  //
  // async getCommentsForPost(
  //   req: RequestWithParamsAndQuery<{ id: string }, PagingQuery>,
  //   res: Response<PagedResponse<ICommentView>>,
  //   next: NextFunction,
  // ) {
  //   const postId = req.params.id as unknown as ObjectId;
  //   const { ...pagination } = req.query as PagingFilter;
  //   const dto: GetCommentsDto = {
  //     postId,
  //     paginator: pagination,
  //   };
  //   if (req.user?.id) {
  //     const userId = createObjId(req.user.id);
  //     dto.userId = userId;
  //   }
  //   try {
  //     const data = await this.commentsQueryRepo.getComments(dto);
  //     res.status(HttpStatuses.Success).send(data);
  //     return;
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
