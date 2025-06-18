import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from '../application/devices-security.service';
import { JwtService } from '@nestjs/jwt';
import { SessionsQueryRepository } from '../infrastructure/query/devices-security.query-repository';
import { RefreshTokenGuard } from '../guards/bearer/jwt-refresh-token-guard';
import { Request } from 'express';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../constants/auth-token.inject-constants';

@UseGuards(RefreshTokenGuard)
@Controller('security')
export class DevicesSecurityController {
  constructor(
    private readonly sessionsService: SessionsService,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    private readonly sessionsQueryRepo: SessionsQueryRepository,
  ) {}

  @Get('devices')
  @HttpCode(HttpStatus.OK)
  async getDevices(@Req() req: Request) {
    const token = req.cookies.refreshToken as string;
    const payload =
      this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(token);
    return this.sessionsQueryRepo.getSessionsOrFail(payload.userId);
  }

  @Delete('devices/:deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnotherSession(
    @Req() req: Request,
    @Param('deviceId', ObjectIdValidationPipe) deviceId: string,
  ) {
    const token = req.cookies.refreshToken as string;
    await this.sessionsService.deleteAnotherSession(token, deviceId);
  }

  @Delete('devices/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOtherSessions(@Req() req: Request) {
    return this.sessionsService.deleteOtherSessions(
      req.cookies.refreshToken as string,
    );
  }
}
