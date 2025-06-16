import { PostLikeStatus } from '../api/view-dto/posts.view-dto';

export class HandlePostLikeDto {
  userId: string;
  postId: string;
  status: PostLikeStatus;
}
