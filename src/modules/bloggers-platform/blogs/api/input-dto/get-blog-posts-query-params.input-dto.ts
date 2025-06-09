import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';
import { PostsSortBy } from 'src/modules/bloggers-platform/posts/api/input-dto/get-posts-query-params.input-dto';

export class GetBlogPostsQueryParams extends BaseQueryParams {
  @ApiProperty({
    description: 'sorting enum',
    enum: PostsSortBy,
  })
  @IsEnum(PostsSortBy)
  sortBy: PostsSortBy = PostsSortBy.CreatedAt;
}
