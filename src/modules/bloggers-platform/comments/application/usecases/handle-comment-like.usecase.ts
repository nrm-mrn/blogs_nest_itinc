import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CommentLike,
  CommentLikeDocument,
  CommentLikeModelType,
  CommentLikeStatus,
} from '../../domain/comment-like.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument } from '../../domain/comment.entity';
import { CommentsRepository } from '../../infrastructure/comments.repository';
import { CreateCommentLikeDomainDto } from '../../domain/dto/create-comment-like-domain-dto';

export class HandleCommentLikeCommand {
  constructor(
    public userId: string,
    public commentId: string,
    public status: CommentLikeStatus,
  ) {}
}

@CommandHandler(HandleCommentLikeCommand)
export class CommentLikeCommandHandler
  implements ICommandHandler<HandleCommentLikeCommand>
{
  constructor(
    @InjectModel(CommentLike.name)
    private readonly CommentLikeModel: CommentLikeModelType,
    private readonly commentRepository: CommentsRepository,
  ) {}
  async execute(command: HandleCommentLikeCommand): Promise<void> {
    const comment = await this.commentRepository.findCommentByIdOrFail(
      command.commentId,
    );
    const commentLike = await this.commentRepository.findCommLikeByUser(
      command.commentId,
      command.userId,
    );
    const dto: CreateCommentLikeDomainDto = {
      commentId: command.commentId,
      status: command.status,
      userId: command.userId,
    };
    if (!commentLike) {
      return this.createNewLikeDoc(dto, comment);
    }
    return this.updateLikeStatus(comment, commentLike, dto);
  }

  private async createNewLikeDoc(
    dto: CreateCommentLikeDomainDto,
    comment: CommentDocument,
  ) {
    if (dto.status === CommentLikeStatus.NONE) {
      return;
    }
    switch (dto.status) {
      case CommentLikeStatus.LIKE: {
        comment.addLike();
        break;
      }
      case CommentLikeStatus.DISLIKE: {
        comment.addDislike();
        break;
      }
    }
    const like = this.CommentLikeModel.createLike({
      ...dto,
    });
    await Promise.all([
      this.commentRepository.save(like),
      this.commentRepository.save(comment),
    ]);
    return;
  }

  private async updateLikeStatus(
    comment: CommentDocument,
    like: CommentLikeDocument,
    dto: CreateCommentLikeDomainDto,
  ): Promise<void> {
    if (like.status !== dto.status) {
      switch (like.status) {
        case CommentLikeStatus.LIKE: {
          comment.removeLike();
          if (dto.status === CommentLikeStatus.DISLIKE) {
            comment.addDislike();
          }
          break;
        }
        case CommentLikeStatus.DISLIKE: {
          comment.removeDislike();
          if (dto.status === CommentLikeStatus.LIKE) {
            comment.addLike();
          }
          break;
        }
        case CommentLikeStatus.NONE: {
          if (dto.status === CommentLikeStatus.LIKE) {
            comment.addLike();
            break;
          }
          comment.addDislike();
          break;
        }
      }
      like.status = dto.status;
      await Promise.all([
        this.commentRepository.save(like),
        this.commentRepository.save(comment),
      ]);
    }
    return;
  }
}
