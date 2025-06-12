import { Injectable } from '@nestjs/common';
import {
  DeviceAuthSession,
  SessionDocument,
  SessionModelType,
} from '../domain/session.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class DevicesSecurityRepository {
  constructor(
    @InjectModel(DeviceAuthSession.name)
    private readonly SessionModel: SessionModelType,
  ) {}
  async save(session: SessionDocument): Promise<string> {
    const res = await session.save();
    return res._id.toString();
  }

  async deleteOtherSessions(iat: Date, userId: string): Promise<void> {
    const result = await this.SessionModel.deleteMany({
      userId,
      iat: { $ne: iat },
    }).exec();
    if (result.acknowledged) {
      return;
    }
    throw new DomainException({
      code: DomainExceptionCode.InternalServerError,
      message: 'Failed to delete sessions, operation not acknowledged by db',
    });
  }

  async deleteSession(session: SessionDocument): Promise<void> {
    const result = await session.deleteOne();
    if (result.acknowledged) {
      return;
    }
    throw new DomainException({
      code: DomainExceptionCode.InternalServerError,
      message: 'Failed to delete the session, operation not acknowledged by db',
    });
  }

  async findSessionOrFail(
    deviceId: string,
    iat: Date,
  ): Promise<SessionDocument> {
    const session = await this.SessionModel.findOne({
      _id: deviceId,
      iat,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'Session does not exist or already expired',
      }),
    );
    return session;
  }

  //WARN: Unsafe without checking iat of the token presenter
  async findSessionByDeviceId(
    deviceId: string,
  ): Promise<SessionDocument | null> {
    return this.SessionModel.findById(deviceId);
  }
}
