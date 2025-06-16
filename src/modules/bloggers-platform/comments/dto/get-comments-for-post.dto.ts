import { GetPostCommentsQueryParams } from '../../posts/api/input-dto/get-post-comments-query-params.input-dto';

export class GetCommentsForPostQueryDto {
  query: GetPostCommentsQueryParams;
  postId: string;
  userId: string | null;
}
