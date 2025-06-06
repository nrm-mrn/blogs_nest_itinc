import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { DomainException, Extension } from '../domain-exceptions';
import { Response } from 'express';
import { DomainExceptionCode } from '../domain-exception-codes';
import { APIErrorResult, FieldError } from '../api-error.result';

@Catch(DomainException)
export class DomainHttpExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = this.mapToHttpStatus(exception.code);
    let body = {};
    if (exception.extensions) {
      body = this.buildResponseBody(exception.extensions);
    }
    response.status(code).json(body);
  }

  private mapToHttpStatus(code: DomainExceptionCode): number {
    switch (code) {
      case DomainExceptionCode.BadRequest:
      case DomainExceptionCode.ValidationError:
      case DomainExceptionCode.ConfirmationCodeExpired:
      case DomainExceptionCode.EmailNotConfirmed:
      case DomainExceptionCode.PasswordRecoveryCodeExpired:
        return HttpStatus.BAD_REQUEST;
      case DomainExceptionCode.Forbidden:
        return HttpStatus.FORBIDDEN;
      case DomainExceptionCode.NotFound:
        return HttpStatus.NOT_FOUND;
      case DomainExceptionCode.Unauthorized:
        return HttpStatus.UNAUTHORIZED;
      case DomainExceptionCode.InternalServerError:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      default:
        return HttpStatus.I_AM_A_TEAPOT;
    }
  }

  private buildResponseBody(extensions: Extension[]): APIErrorResult {
    const res: FieldError[] = [];
    extensions.forEach((ext) => {
      res.push(new FieldError(ext.message, ext.key));
    });
    return { errorsMessages: res };
  }
}
