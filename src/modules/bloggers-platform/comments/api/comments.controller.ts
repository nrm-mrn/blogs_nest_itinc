import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';

@Controller('comments')
export class CommentsController {
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getComment(
    @Param('id', ObjectIdValidationPipe) id: string,
  ): Promise<void> {
    throw new DomainException({
      code: DomainExceptionCode.NotFound,
      message: 'No comments yet',
    });
  }
}
