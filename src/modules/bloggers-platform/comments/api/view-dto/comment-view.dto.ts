import {
  CommentLikeDocument,
  CommentLikeStatus,
} from '../../domain/comment-like.entity';
import { CommentDocument } from '../../domain/comment.entity';

export class LikesInfoViewModel {
  likesCount: number;
  dislikesCount: number;
  myStatus: CommentLikeStatus;
}

export class CommentatorInfoViewModel {
  userId: string;
  userLogin: string;
}

export class CommentViewDto {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfoViewModel;
  createdAt: string;
  likesInfo: LikesInfoViewModel;

  static mapToView(comm: CommentDocument): CommentViewDto {
    const dto = new CommentViewDto();
    dto.id = comm._id.toString();
    dto.content = comm.content;
    dto.commentatorInfo = {
      userId: comm.commentatorInfo.userId,
      userLogin: comm.commentatorInfo.userLogin,
    };
    dto.createdAt = comm.createdAt.toISOString();
    dto.likesInfo = {
      myStatus: CommentLikeStatus.NONE,
      likesCount: comm.likesCount,
      dislikesCount: comm.dislikesCount,
    };
    return dto;
  }

  public setLike(likes: Map<string, CommentLikeStatus> | CommentLikeDocument) {
    if (likes instanceof Map) {
      const likeStatus = likes.get(this.id);
      if (likeStatus) {
        this.likesInfo.myStatus = likeStatus;
      }
      return;
    }
    this.likesInfo.myStatus = likes.status;
  }
}
