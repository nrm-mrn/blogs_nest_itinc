import { PostDocument } from '../../domain/post.entity';
import { PostLikeDocument } from '../../domain/postLike.entity';

export enum PostLikeStatus {
  LIKE = 'Like',
  DISLIKE = 'Dislike',
  NONE = 'None',
}

export class LikeDetailsViewModel {
  userId: string;
  login: string;
  addedAt: string;
}

export class ExtendedLikesInfoViewModel {
  likesCount: number;
  dislikesCount: number;
  myStatus: PostLikeStatus;
  newestLikes: LikeDetailsViewModel[];
}

export class PostViewDto {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  extendedLikesInfo: ExtendedLikesInfoViewModel;

  static mapToView(post: PostDocument): PostViewDto {
    const dto = new PostViewDto();
    dto.id = post._id.toString();
    dto.title = post.title;
    dto.shortDescription = post.shortDescription;
    dto.content = post.content;
    dto.blogId = post.blogId;
    dto.blogName = post.blogName;
    dto.createdAt = post.createdAt.toISOString();
    dto.extendedLikesInfo = {
      likesCount: post.extendedLikesInfo.likesCount,
      dislikesCount: post.extendedLikesInfo.dislikesCount,
      newestLikes: post.extendedLikesInfo.newestLikes,
      myStatus: PostLikeStatus.NONE,
    };
    return dto;
  }

  public setLike(likes: Map<string, PostLikeStatus> | PostLikeDocument) {
    if (likes instanceof Map) {
      const likeStatus = likes.get(this.id);
      if (likeStatus) {
        this.extendedLikesInfo.myStatus = likeStatus;
      }
      return;
    }
    this.extendedLikesInfo.myStatus = likes.status;
  }
}
