import { ApiProperty } from '@nestjs/swagger';

export abstract class PaginatedViewDto<T> {
  @ApiProperty({
    description: 'array of entities',
  })
  abstract items: T;

  @ApiProperty({
    description: 'total number of found entites according to request filter',
  })
  totalCount: number;

  @ApiProperty({
    description:
      'calculated number of pages based on total cound and page size',
  })
  pagesCount: number;

  @ApiProperty({
    description: 'page number',
  })
  page: number;

  @ApiProperty({
    description: 'max number of entites on page',
  })
  pageSize: number;

  public static mapToView<T>(data: {
    items: T;
    page: number;
    size: number;
    totalCount: number;
  }): PaginatedViewDto<T> {
    return {
      totalCount: data.totalCount,
      pagesCount: Math.ceil(data.totalCount / data.size),
      pageSize: data.size,
      page: data.page,
      items: data.items,
    };
  }
}
