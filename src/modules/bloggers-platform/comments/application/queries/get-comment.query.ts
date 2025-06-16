import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentsQueryRepository } from '../../infrastructure/comments.query-repository';
import { CommentViewDto } from '../../api/view-dto/comment-view.dto';

export class GetCommentQuery {
  constructor(
    public commentId: string,
    public userId: string | null,
  ) {}
}

@QueryHandler(GetCommentQuery)
export class GetCommentQueryHandler
  implements IQueryHandler<GetCommentQuery, CommentViewDto>
{
  constructor(
    private readonly commentsQueryRepository: CommentsQueryRepository,
  ) {}

  execute(query: GetCommentQuery): Promise<CommentViewDto> {
    return this.commentsQueryRepository.findCommentOrNotFoundFail(query);
  }
}
