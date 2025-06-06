import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ConfigurationType } from 'src/modules/config/config.module';
import { DomainExceptionCode } from '../domain-exception-codes';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const message = exception.message || 'Unknown exception occured';
    const code = HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody = this.buildResponseBody(req.url, message);
    res.status(code).json(resBody);
  }

  private buildResponseBody(reqUrl: string, message: string) {
    if (this.configService.get('nodeEnv') === 'production') {
      return {
        timestamp: new Date().toISOString(),
        path: null,
        message: 'Server error occured',
        extensions: [],
        code: DomainExceptionCode.InternalServerError,
      };
    } else {
      return {
        timestamp: new Date().toISOString(),
        path: reqUrl,
        message,
        extensions: [],
        code: DomainExceptionCode.InternalServerError,
      };
    }
  }
}
