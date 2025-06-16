import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';
import { PostsSortBy } from './get-posts-query-params.input-dto';

export class GetPostCommentsQueryParams extends BaseQueryParams {
  @ApiProperty({
    description: 'sorting enum',
    enum: PostsSortBy,
  })
  @IsEnum(PostsSortBy)
  sortBy: PostsSortBy = PostsSortBy.CreatedAt;
}
