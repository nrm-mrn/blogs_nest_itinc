import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthSuccessDto } from '../../dto/auth-success.dto';
import { UsersRepository } from '../../infrastructure/users.repository';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTime, Duration } from 'luxon';
import mongoose from 'mongoose';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from '../../constants/auth-token.inject-constants';
import { CreateAccessTokenDto } from '../../dto/create-access-token.dto';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';
import { CreateSessionDto } from '../../dto/create-session.dto';
import { HashService } from '../passHash.service';
import { DevicesSecurityRepository } from '../../infrastructure/devices-security.repository';
import { InjectModel } from '@nestjs/mongoose';
import {
  DeviceAuthSession,
  SessionModelType,
} from '../../domain/session.entity';
import { UserAccountConfig } from '../../config/user-account.config';

export class LoginUserCommand {
  constructor(
    public loginOrEmail: string,
    public password: string,
    public ip: string,
    public title: string,
  ) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserHandler
  implements ICommandHandler<LoginUserCommand, AuthSuccessDto>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passHashService: HashService,
    @Inject(ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtAccesTokService: JwtService,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    @InjectModel(DeviceAuthSession.name)
    private readonly SessionModel: SessionModelType,
    private readonly sessionsRepository: DevicesSecurityRepository,
    private readonly configService: UserAccountConfig,
  ) {}
  async execute(command: LoginUserCommand): Promise<AuthSuccessDto> {
    const user = await this.usersRepository.findUserByLoginOrEmail(
      command.loginOrEmail,
    );
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'Wrong login or password',
      });
    }
    await this.checkPass(command.password, user.passwordHash);
    const rtInput: CreateRefreshTokenDto = {
      userId: user._id.toString(),
      deviceId: new mongoose.Types.ObjectId().toString(),
      iat: Math.floor(DateTime.utc().toSeconds()),
    };
    const accTInput: CreateAccessTokenDto = {
      id: user._id.toString(),
    };
    const accessToken = this.jwtAccesTokService.sign(accTInput);
    const refreshToken = this.jwtRefreshTokService.sign(rtInput);

    const sessionInput: CreateSessionDto = {
      deviceId: rtInput.deviceId,
      userId: rtInput.userId,
      iat: rtInput.iat,
      ip: command.ip,
      title: command.title,
    };
    await this.saveSession(sessionInput);

    return { accessToken, refreshToken };
  }

  private async checkPass(inputPassword: string, passHash: string) {
    const isValidPass = await this.passHashService.compareHash(
      inputPassword,
      passHash,
    );
    if (!isValidPass) {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'Wrong login or password',
      });
    }
  }

  private async saveSession(input: CreateSessionDto) {
    const domainInput = {
      ...input,
      deviceId: new mongoose.Types.ObjectId(input.deviceId),
      expiration: DateTime.utc()
        .plus(
          Duration.fromMillis(this.configService.refreshTokenDuration * 1000),
        )
        .toJSDate(),
    };
    const session = this.SessionModel.createSession(domainInput);
    await this.sessionsRepository.save(session);
    return;
  }
}
