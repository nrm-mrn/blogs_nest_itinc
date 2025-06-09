import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class BaseQueryParams {
  @ApiProperty({
    description: 'requested page',
    default: 1,
  })
  @Type(() => Number)
  @IsNumber()
  pageNumber: number = 1;

  @ApiProperty({
    description: 'number of elements on page',
    default: 10,
  })
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 10;

  @ApiProperty({
    description: 'direction for sorting results',
    enum: SortDirection,
  })
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.DESC;

  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
