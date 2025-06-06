import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../domain/user.entity';
import { GetUsersQueryParams } from '../api/input-dto/get-users-query-params.input-dto';
import { FilterQuery } from 'mongoose';
import { PaginatedViewDto } from 'src/core/dto/base.paginated.view-dto';
import { UserViewDto } from '../api/view-dto/users.view-dto';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
  ) {}

  getFilter(dto: GetUsersQueryParams): FilterQuery<UserDocument> {
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

  async getAllUsers(
    dto: GetUsersQueryParams,
  ): Promise<PaginatedViewDto<UserViewDto[]>> {
    const filter = this.getFilter(dto);
    const users = await this.UserModel.find(filter)
      .sort({ [dto.sortBy]: dto.sortDirection })
      .skip(dto.calculateSkip())
      .limit(dto.pageSize)
      .exec();
    const total = await this.UserModel.countDocuments(filter).exec();
    const usersView = users.map((user) => {
      return UserViewDto.mapToView(user);
    });
    return PaginatedViewDto.mapToView({
      items: usersView,
      page: dto.pageNumber,
      size: dto.pageSize,
      totalCount: total,
    });
  }

  async getUserById(id: string): Promise<UserViewDto | null> {
    //for users router post method
    const user = await this.UserModel.findOne({ _id: id, deletedAt: null });
    if (!user) {
      return null;
    }
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
