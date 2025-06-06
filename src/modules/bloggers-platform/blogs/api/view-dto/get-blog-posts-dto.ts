import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';

export enum BlogPostsSortBy {
  CreatedAt = 'createdAt',
}

export class GetBlogPostsDto extends BaseQueryParams {
  sortBy: BlogPostsSortBy;
  blogId: string;
}
