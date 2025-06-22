import { ICommandHandler } from '@nestjs/cqrs';
import { AuthSuccessDto } from '../../dto/auth-success.dto';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from '../../constants/auth-token.inject-constants';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';
import { DevicesSecurityRepository } from '../../infrastructure/devices-security.repository';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';

export class ReissueTokensCommand {
  constructor(public token: string) {}
}

export class ReissueTokensHandler
  implements ICommandHandler<ReissueTokensCommand, AuthSuccessDto>
{
  constructor(
    @Inject(ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtAccesTokService: JwtService,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    private readonly sessionsRepository: DevicesSecurityRepository,
  ) {}

  async execute(command: ReissueTokensCommand): Promise<AuthSuccessDto> {
    const payload = this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(
      command.token,
    );

    await this.sessionsRepository.findSessionOrFail(
      payload.deviceId,
      payload.iat,
    );

    const rtInput: CreateRefreshTokenDto = {
      userId: payload.userId,
      deviceId: payload.deviceId,
      iat: Math.floor(DateTime.utc().toSeconds()),
    };
    const refreshToken = this.jwtRefreshTokService.sign(rtInput);
    const accessToken = this.jwtAccesTokService.sign({ id: payload.userId });
    await this.refreshSession(payload.deviceId, rtInput.iat);
    return { accessToken, refreshToken };
  }

  private async refreshSession(
    deviceId: string,
    newIat: number,
  ): Promise<void> {
    const session =
      await this.sessionsRepository.findSessionByDeviceId(deviceId);
    if (!session) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'Unable to find a session for refresh',
      });
    }
    session.iat = newIat;
    await this.sessionsRepository.save(session);
    return;
  }
}
