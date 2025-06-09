import { Injectable } from '@nestjs/common';
import { GetPostCommentsQueryParams } from '../../posts/api/input-dto/get-post-comments-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { CommentViewDto } from '../api/view-dto/comment-view.dto';

@Injectable()
export class CommentsQueryRepository {
  async getCommentsForPosts(
    dto: GetPostCommentsQueryParams,
  ): Promise<PaginatedViewDto<CommentViewDto[]>> {
    return PaginatedViewDto.mapToView({
      items: [],
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: 0,
    });
  }
}
