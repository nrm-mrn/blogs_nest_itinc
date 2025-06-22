import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../../constants/auth-token.inject-constants';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';
import { DevicesSecurityRepository } from '../../infrastructure/devices-security.repository';

export class LogoutCommand {
  constructor(public token: string) {}
}

@CommandHandler(LogoutCommand)
export class LogoutCommandHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    private readonly sessionsRepository: DevicesSecurityRepository,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
  ) {}

  async execute(command: LogoutCommand): Promise<any> {
    const payload = this.jwtRefreshTokService.verify<CreateRefreshTokenDto>(
      command.token,
    );
    //NOTE: check that refresh token session is active
    const session = await this.sessionsRepository.findSessionOrFail(
      payload.deviceId,
      payload.iat,
    );
    return this.sessionsRepository.deleteSession(session);
  }
}
