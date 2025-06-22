import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQueryParams } from '../../api/input-dto/get-users-query-params.input-dto';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { UserViewDto } from '../../api/view-dto/users.view-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../../domain/user.entity';
import { FilterQuery } from 'mongoose';

export class GetAllUsersQuery {
  constructor(public params: GetUsersQueryParams) {}
}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery, PaginatedViewDto<UserViewDto[]>>
{
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
  ) {}

  async execute(
    query: GetAllUsersQuery,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const filter = this.getFilter(query.params);
    const users = await this.UserModel.find(filter)
      .sort({ [query.params.sortBy]: query.params.sortDirection })
      .skip(query.params.calculateSkip())
      .limit(query.params.pageSize)
      .exec();
    const total = await this.UserModel.countDocuments(filter).exec();
    const usersView = users.map((user) => {
      return UserViewDto.mapToView(user);
    });
    return PaginatedViewDto.mapToView({
      items: usersView,
      page: query.params.pageNumber,
      size: query.params.pageSize,
      totalCount: total,
    });
  }

  private getFilter(dto: GetUsersQueryParams): FilterQuery<UserDocument> {
    const filter: FilterQuery<UserDocument> = { deletedAt: null };
    let searchLogin: FilterQuery<UserDocument> | null = null;
    let searchEmail: FilterQuery<UserDocument> | null = null;
    if ('searchLoginTerm' in dto && dto.searchLoginTerm !== null) {
      searchLogin = { login: { $regex: dto.searchLoginTerm, $options: 'i' } };
    }
    if ('searchEmailTerm' in dto && dto.searchEmailTerm !== null) {
      searchEmail = { email: { $regex: dto.searchEmailTerm, $options: 'i' } };
    }
    if (searchLogin) {
      if (searchEmail) {
        return { ...filter, $or: [searchEmail, searchLogin] };
      }
      return { ...filter, $or: [searchLogin] };
    }
    if (searchEmail) {
      return { ...filter, $or: [searchEmail] };
    }
    return filter;
  }
}
