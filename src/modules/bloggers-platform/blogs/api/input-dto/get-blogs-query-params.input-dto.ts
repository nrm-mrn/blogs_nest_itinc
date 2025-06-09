import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryParams } from 'src/core/dto/base.query-params.input-dto';

export enum BlogsSortBy {
  CreatedAt = 'createdAt',
  Name = 'name',
  Description = 'description',
  WebsiteUrl = 'websiteUrl',
}

export class GetBlogsQueryParams extends BaseQueryParams {
  @ApiProperty({
    description: 'column for sorting, for now only createdAt is supported',
    enum: BlogsSortBy,
  })
  @IsEnum(BlogsSortBy)
  sortBy: BlogsSortBy = BlogsSortBy.CreatedAt;

  @ApiProperty({
    description: 'term to perform search in blog names',
    default: null,
  })
  @IsString()
  @IsOptional()
  searchNameTerm: string | null = null;
}
