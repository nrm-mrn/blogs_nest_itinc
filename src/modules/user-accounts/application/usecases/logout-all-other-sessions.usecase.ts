import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../../constants/auth-token.inject-constants';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';
import { DevicesSecurityRepository } from '../../infrastructure/devices-security.repository';

export class LogoutOtherSessionsCommand {
  constructor(public token: string) {}
}

@CommandHandler(LogoutOtherSessionsCommand)
export class LogoutOtherSessionHandler
  implements ICommandHandler<LogoutOtherSessionsCommand>
{
  constructor(
    private readonly sessionsRepository: DevicesSecurityRepository,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
  ) {}

  async execute(command: LogoutOtherSessionsCommand): Promise<any> {
    const payload = this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(
      command.token,
    );
    const deviceId = payload.deviceId;

    await this.sessionsRepository.findSessionOrFail(deviceId, payload.iat);
    return this.sessionsRepository.deleteOtherSessions(
      payload.iat,
      payload.userId,
    );
  }
}
