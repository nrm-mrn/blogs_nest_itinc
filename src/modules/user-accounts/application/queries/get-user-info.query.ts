import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MeViewDto } from '../../api/view-dto/users.view-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from '../../domain/user.entity';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';

export class GetUserInfoQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoQueryHandler
  implements IQueryHandler<GetUserInfoQuery, MeViewDto>
{
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
  ) {}

  async execute(query: GetUserInfoQuery): Promise<MeViewDto> {
    const user = await this.UserModel.findOne({
      _id: query.userId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'user not found by access token info',
      }),
    );
    return MeViewDto.mapToView(user);
  }
}
