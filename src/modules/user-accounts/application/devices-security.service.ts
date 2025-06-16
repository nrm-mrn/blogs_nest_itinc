import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DevicesSecurityRepository } from '../infrastructure/devices-security.repository';
import { InjectModel } from '@nestjs/mongoose';
import {
  DeviceAuthSession,
  SessionDocument,
  SessionModelType,
} from '../domain/session.entity';
import mongoose from 'mongoose';
import { CreateSessionDto } from '../dto/create-session.dto';
import { DateTime, Duration } from 'luxon';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from 'src/modules/config/config.module';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../constants/auth-token.inject-constants';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(DeviceAuthSession.name)
    private readonly SessionModel: SessionModelType,
    private readonly sessionsRepository: DevicesSecurityRepository,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}

  async saveSession(input: CreateSessionDto): Promise<{ deviceId: string }> {
    const domainInput = {
      ...input,
      deviceId: new mongoose.Types.ObjectId(input.deviceId),
      expiration: DateTime.utc()
        .plus(
          Duration.fromMillis(
            this.configService.get('refreshTokenDuration') * 60 * 1000,
          ),
        )
        .toJSDate(),
    };
    const session = this.SessionModel.createSession(domainInput);

    const deviceId = await this.sessionsRepository.save(session);
    return { deviceId };
  }

  async getSession(deviceId: string, iat: number): Promise<SessionDocument> {
    const timestamp = new Date(iat);
    const session = await this.sessionsRepository.findSessionOrFail(
      deviceId,
      timestamp,
    );
    return session;
  }

  async refreshSession(deviceId: string, newIat: number): Promise<void> {
    const session =
      await this.sessionsRepository.findSessionByDeviceId(deviceId);
    if (!session) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'Unable to find a session for refresh',
      });
    }
    const iat = new Date(newIat);
    session.iat = iat;
    await this.sessionsRepository.save(session);
    return;
  }

  async logout(token: string): Promise<void> {
    const payload =
      this.jwtRefreshTokService.verify<CreateRefreshTokenDto>(token);
    //NOTE: check that refresh token session is active
    const lastActiveDate = new Date(payload.iat);
    const session = await this.sessionsRepository.findSessionOrFail(
      payload.deviceId,
      lastActiveDate,
    );
    return this.sessionsRepository.deleteSession(session);
  }

  async deleteAnotherSession(
    token: string,
    deviceToDelete: string,
  ): Promise<void> {
    const payload =
      this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(token);
    const deviceId = payload.deviceId;

    //NOTE: check that refresh token session is active
    const lastActiveDate = new Date(payload.iat);
    const session = await this.sessionsRepository.findSessionOrFail(
      deviceId,
      lastActiveDate,
    );
    //NOTE: check that userId is the same in token and in the deviceToDelete
    const targetSession =
      await this.sessionsRepository.findSessionByDeviceId(deviceToDelete);
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

  async deleteOtherSessions(token: string): Promise<void> {
    const payload =
      this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(token);
    const deviceId = payload.deviceId;
    const iat = new Date(payload.iat);

    await this.sessionsRepository.findSessionOrFail(deviceId, iat);
    return this.sessionsRepository.deleteOtherSessions(iat, payload.userId);
  }
}
