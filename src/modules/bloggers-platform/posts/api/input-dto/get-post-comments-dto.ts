import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';
import { PostsSortBy } from './get-posts-query-params.input-dto';

export class GetPostCommentsDto extends BaseQueryParams {
  sortBy: PostsSortBy = PostsSortBy.CreatedAt;
  postId: string;
  userId?: string = undefined;
}
