import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentsQueryRepository } from '../../infrastructure/comments.query-repository';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { CommentViewDto } from '../../api/view-dto/comment-view.dto';
import { GetPostCommentsQueryParams } from '../../api/input-dto/get-post-comments-query-params.input-dto';
import { PostsRepository } from 'src/modules/bloggers-platform/posts/infrastructure/posts.repository';

export class GetCommentsByPostQuery {
  constructor(
    public readonly query: GetPostCommentsQueryParams,
    public readonly postId: string,
    public readonly userId?: string,
  ) {}
}

@QueryHandler(GetCommentsByPostQuery)
export class GetCommentsByPostQueryHandler
  implements
    IQueryHandler<GetCommentsByPostQuery, PaginatedViewDto<CommentViewDto[]>>
{
  constructor(
    private readonly commentsQueryRepository: CommentsQueryRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async execute(
    query: GetCommentsByPostQuery,
  ): Promise<PaginatedViewDto<CommentViewDto[]>> {
    await this.postsRepository.findOrNotFoundFail(query.postId);
    return this.commentsQueryRepository.getCommentsForPost(query);
  }
}
