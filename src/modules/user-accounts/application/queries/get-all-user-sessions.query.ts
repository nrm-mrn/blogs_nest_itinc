import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SessionViewDto } from '../../api/view-dto/session.view-dto';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { REFRESH_TOKEN_STRATEGY_INJECT_TOKEN } from '../../constants/auth-token.inject-constants';
import {
  DeviceAuthSession,
  SessionModelType,
} from '../../domain/session.entity';
import { CreateRefreshTokenDto } from '../../dto/create-refresh-token.dto';

export class GetUserSessionsQuery {
  constructor(public token: string) {}
}

@QueryHandler(GetUserSessionsQuery)
export class GetUserSessionsQueryHandler
  implements IQueryHandler<GetUserSessionsQuery, SessionViewDto[]>
{
  constructor(
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    @InjectModel(DeviceAuthSession.name)
    private readonly SessionModel: SessionModelType,
  ) {}

  async execute(query: GetUserSessionsQuery): Promise<SessionViewDto[]> {
    const payload = this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(
      query.token,
    );
    const sessions = await this.SessionModel.find({
      userId: payload.userId,
    }).exec();
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
