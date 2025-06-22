import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User, UserModelType } from '../../domain/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDto } from '../../api/view-dto/users.view-dto';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { DomainException } from 'src/core/exceptions/domain-exceptions';

export class GetUserQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IQueryHandler<GetUserQuery, UserViewDto>
{
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
  ) {}

  async execute(query: GetUserQuery): Promise<UserViewDto> {
    const user = await this.UserModel.findOne({
      _id: query.userId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'User not found after creation',
      }),
    );
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
