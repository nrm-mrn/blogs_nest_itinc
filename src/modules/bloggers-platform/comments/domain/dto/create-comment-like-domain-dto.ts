import { CommentLikeStatus } from '../comment-like.entity';

export class CreateCommentLikeDomainDto {
  userId: string;
  commentId: string;
  status: CommentLikeStatus;
}
