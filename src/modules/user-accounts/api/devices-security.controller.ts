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
import { SessionsService } from '../application/devices-security.service';
import { JwtService } from '@nestjs/jwt';
import { SessionsQueryRepository } from '../infrastructure/query/devices-security.query-repository';
import { RefreshTokenGuard } from '../guards/bearer/jwt-refresh-token-guard';
import { Request } from 'express';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { ObjectIdValidationPipe } from 'src/core/pipes/object-id-validation-pipe.service';

@UseGuards(RefreshTokenGuard)
@Controller('devices')
export class DevicesSecurityController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
    private readonly sessionsQueryRepo: SessionsQueryRepository,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDevices(@Req() req: Request) {
    const token = req.cookies.refreshToken as string;
    const payload = this.jwtService.decode<CreateRefreshTokenDto>(token);
    return this.sessionsQueryRepo.getSessionsOrFail(payload.userId);
  }

  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnotherSession(
    @Req() req: Request,
    @Param('deviceId', ObjectIdValidationPipe) deviceId: string,
  ) {
    const token = req.cookies.refreshToken as string;
    await this.sessionsService.deleteAnotherSession(token, deviceId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOtherSessions(@Req() req: Request) {
    return this.sessionsService.deleteOtherSessions(req.cookies.refreshToken);
  }
}
