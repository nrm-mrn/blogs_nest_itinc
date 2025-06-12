import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DeviceAuthSession,
  SessionModelType,
} from '../../domain/session.entity';
import { SessionViewDto } from '../../api/view-dto/session.view-dto';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class SessionsQueryRepository {
  constructor(
    @InjectModel(DeviceAuthSession.name)
    private readonly SessionModel: SessionModelType,
  ) {}
  async getSessionsOrFail(userId: string): Promise<SessionViewDto[]> {
    const sessions = await this.SessionModel.find({ userId }).exec();
    if (!sessions.length) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'Not found any sessions for a valid refresh token',
      });
    }
    const res: SessionViewDto[] = [];
    sessions.forEach((session) => {
      res.push(SessionViewDto.mapToView(session));
    });
    return res;
  }
}
