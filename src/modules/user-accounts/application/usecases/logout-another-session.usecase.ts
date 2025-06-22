import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../../constants/auth-token.inject-constants';
import { DevicesSecurityRepository } from '../../infrastructure/devices-security.repository';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';

export class LogoutAnotherSessionCommand {
  constructor(
    public token: string,
    public deviceId: string,
  ) {}
}

@CommandHandler(LogoutAnotherSessionCommand)
export class LogoutAnotherSessionHandler
  implements ICommandHandler<LogoutAnotherSessionCommand>
{
  constructor(
    private readonly sessionsRepository: DevicesSecurityRepository,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
  ) {}

  async execute(command: LogoutAnotherSessionCommand): Promise<any> {
    const payload = this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(
      command.token,
    );
    const deviceId = payload.deviceId;

    //NOTE: check that refresh token session is active
    const session = await this.sessionsRepository.findSessionOrFail(
      deviceId,
      payload.iat,
    );
    //NOTE: check that userId is the same in token and in the deviceToDelete
    const targetSession = await this.sessionsRepository.findSessionByDeviceId(
      command.deviceId,
    );
    if (!targetSession) {
      throw new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Session does not exist or already expired',
      });
    }
    if (targetSession.userId !== session.userId) {
      throw new DomainException({
        code: DomainExceptionCode.Forbidden,
        message: 'Could not delete session of another user',
      });
    }
    return this.sessionsRepository.deleteSession(targetSession);
  }
}
