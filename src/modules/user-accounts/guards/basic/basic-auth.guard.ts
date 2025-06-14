import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigurationType } from 'src/modules/config/config.module';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers.authorization;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'unauthorized',
      })
    }

    const adminUsername = this.configService.get('adminUsername') as string;
    const adminPassword = this.configService.get('adminPassword') as string;

    const base64Creds = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Creds, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':');

    if (username === adminUsername && password === adminPassword) {
      return true;
    } else {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'unauthorized'
      })
    }
  }
}
