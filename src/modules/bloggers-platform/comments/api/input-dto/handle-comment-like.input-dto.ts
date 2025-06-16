import { IsEnum } from 'class-validator';
import { CommentLikeStatus } from '../../domain/comment-like.entity';

export class HandleCommentLikeInputDto {
  @IsEnum(CommentLikeStatus)
  likeStatus: CommentLikeStatus;
}
