import { IsEnum } from 'class-validator';
import { PostLikeStatus } from '../view-dto/posts.view-dto';

export class PostLikeInputDto {
  @IsEnum(PostLikeStatus)
  likeStatus: PostLikeStatus;
}
