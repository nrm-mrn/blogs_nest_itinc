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
import { GetPostCommentsQueryParams } from './input-dto/get-post-comments-query-params.input-dto';
import { CommentsQueryRepository } from '../../comments/infrastructure/comments.query-repository';
import { CommentViewDto } from '../../comments/api/view-dto/comment-view.dto';
import { GetPostCommentsDto } from './input-dto/get-post-comments-dto';
import { PostLikeInputDto } from './input-dto/post-like.input-dto';
import { ExtractUserFromRequest } from 'src/modules/user-accounts/guards/decorators/extract-user-from-request.decorator';
import {
  Nullable,
  UserContextDto,
} from 'src/modules/user-accounts/guards/dto/user-context.dto';
import { JwtOptionalAuthGuard } from 'src/modules/user-accounts/guards/bearer/jwt-optional-guard';
import { JwtAuthGuard } from 'src/modules/user-accounts/guards/bearer/jwt-auth.guard';
import { BasicAuthGuard } from 'src/modules/user-accounts/guards/basic/basic-auth.guard';
import { HandlePostLikeDto } from '../dto/handle-post-like.dto';
import { ExtractUserFromRequestIfExists } from 'src/modules/user-accounts/guards/decorators/extract-user-if-exists-from-request.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCommentsByPostQuery } from '../../comments/application/queries/get-comments-for-post.query';
import { CreateCommentForPostInputDto } from './input-dto/create-comment-for-post.input-dto';
import { CreateCommentCommand } from '../../comments/application/usecases/create-comment.usecase';
import { GetCommentQuery } from '../../comments/application/queries/get-comment.query';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsQueryRepo: PostsQueryRepository,
    private readonly postsService: PostsService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtOptionalAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getPosts(
    @Query() query: GetPostsQueryParams,
    @ExtractUserFromRequestIfExists() user: UserContextDto | null,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQueryRepo.getAllPosts(query, user?.userId);
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() query: CreatePostInputDto): Promise<PostViewDto> {
    const { postId } = await this.postsService.createPost(query);
    return this.postsQueryRepo.findPostOrNotFoundFail(postId);
  }

  @UseGuards(JwtOptionalAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getPost(
    @Param('id', ObjectIdValidationPipe) id: string,
    @ExtractUserFromRequestIfExists() user: UserContextDto | null,
  ): Promise<PostViewDto> {
    return this.postsQueryRepo.findPostOrNotFoundFail(id, user?.userId);
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editPost(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() query: UpdatePostInputDto,
  ): Promise<void> {
    return this.postsService.editPost(id, query);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId/like-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handlePostLike(
    @Param('postId', ObjectIdValidationPipe) postId: string,
    @Body() body: PostLikeInputDto,
    @ExtractUserFromRequest() user: UserContextDto,
  ) {
    const dto: HandlePostLikeDto = {
      postId,
      userId: user.userId,
      status: body.likeStatus,
    };
    return this.postsService.handlePostLike(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/comments')
  @HttpCode(HttpStatus.CREATED)
  async createCommentForPost(
    @Body() body: CreateCommentForPostInputDto,
    @Param('postId', ObjectIdValidationPipe) postId: string,
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<CommentViewDto> {
    const commentId = await this.commandBus.execute(
      new CreateCommentCommand(postId, user.userId, body.content),
    );
    return this.queryBus.execute(new GetCommentQuery(commentId, user.userId));
  }

  @UseGuards(JwtOptionalAuthGuard)
  @Get(':id/comments')
  @HttpCode(HttpStatus.OK)
  async getCommentsForPost(
    @Param('id', ObjectIdValidationPipe) postId: string,
    @Query() query: GetPostCommentsQueryParams,
    @ExtractUserFromRequestIfExists() user: Nullable<UserContextDto>,
  ): Promise<PaginatedViewDto<CommentViewDto[]>> {
    return this.queryBus.execute(
      new GetCommentsByPostQuery(query, postId, user.userId),
    );
  }
}
