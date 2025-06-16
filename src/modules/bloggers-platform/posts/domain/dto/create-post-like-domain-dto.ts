import { PostLikeStatus } from '../../api/view-dto/posts.view-dto';

export class CreatePostLikeDomainDto {
  userId: string;
  login: string;
  postId: string;
  status: PostLikeStatus;
}
