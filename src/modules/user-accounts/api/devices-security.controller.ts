import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RefreshTokenGuard } from '../guards/bearer/jwt-refresh-token-guard';
import { Request } from 'express';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LogoutAnotherSessionCommand } from '../application/usecases/logout-another-session.usecase';
import { LogoutOtherSessionsCommand } from '../application/usecases/logout-all-other-sessions.usecase';
import { GetUserSessionsQuery } from '../application/queries/get-all-user-sessions.query';

@UseGuards(RefreshTokenGuard)
@Controller('security')
export class DevicesSecurityController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('devices')
  @HttpCode(HttpStatus.OK)
  async getDevices(@Req() req: Request) {
    const token = req.cookies.refreshToken as string;
    return this.queryBus.execute(new GetUserSessionsQuery(token));
  }

  @Delete('devices/:deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnotherSession(
    @Req() req: Request,
    @Param('deviceId', ObjectIdValidationPipe) deviceId: string,
  ) {
    const token = req.cookies.refreshToken as string;
    await this.commandBus.execute(
      new LogoutAnotherSessionCommand(token, deviceId),
    );
  }

  @Delete('devices/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOtherSessions(@Req() req: Request) {
    return this.commandBus.execute(
      new LogoutOtherSessionsCommand(req.cookies.refreshToken as string),
    );
  }
}
