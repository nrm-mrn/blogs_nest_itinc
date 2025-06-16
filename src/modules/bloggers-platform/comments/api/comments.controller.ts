import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';
import { GetCommentQuery } from '../application/queries/get-comment.query';
import { JwtOptionalAuthGuard } from 'src/modules/user-accounts/guards/bearer/jwt-optional-guard';
import { ExtractUserFromRequestIfExists } from 'src/modules/user-accounts/guards/decorators/extract-user-if-exists-from-request.decorator';
import {
  Nullable,
  UserContextDto,
} from 'src/modules/user-accounts/guards/dto/user-context.dto';
import { JwtAuthGuard } from 'src/modules/user-accounts/guards/bearer/jwt-auth.guard';
import { UpdateCommentInputDto } from './input-dto/update-comment.input-dto';
import { ExtractUserFromRequest } from 'src/modules/user-accounts/guards/decorators/extract-user-from-request.decorator';
import { CommentViewDto } from './view-dto/comment-view.dto';
import { UpdateCommentCommand } from '../application/usecases/update-comment.usecase';
import { DeleteCommentCommand } from '../application/usecases/delete-comment.usecase';
import { HandleCommentLikeCommand } from '../application/usecases/handle-comment-like.usecase';
import { HandleCommentLikeInputDto } from './input-dto/handle-comment-like.input-dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(JwtOptionalAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getComment(
    @Param('id', ObjectIdValidationPipe) id: string,
    @ExtractUserFromRequestIfExists() user: UserContextDto | null,
  ): Promise<CommentViewDto> {
    return this.queryBus.execute(new GetCommentQuery(id, user?.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateComment(
    @Body() body: UpdateCommentInputDto,
    @Param('id', ObjectIdValidationPipe) commentId: string,
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateCommentCommand(commentId, user.userId, body.content),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('id', ObjectIdValidationPipe) commentId: string,
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new DeleteCommentCommand(commentId, user.userId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/like-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handleLike(
    @Body() body: HandleCommentLikeInputDto,
    @Param('id', ObjectIdValidationPipe) commentId: string,
    @ExtractUserFromRequest() user: UserContextDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new HandleCommentLikeCommand(user.userId, commentId, body.likeStatus),
    );
  }
}
