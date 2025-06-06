import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../domain/user.entity';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { UUID } from 'crypto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
  ) {}

  async save(user: UserDocument): Promise<string> {
    await user.save();
    return user._id.toString();
  }

  async findById(userId: string): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne({ _id: userId, deletedAt: null });
    return user;
  }

  async findOrNotFoundFail(userId: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({
      _id: userId,
      deletedAt: null,
    }).orFail(
      new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'User not found',
      }),
    );
    return user;
  }

  async deleteUser(user: UserDocument) {
    user.markDeleted();
    return this.save(user);
  }

  async findUserByLoginOrEmail(input: string): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne()
      .or([{ login: input }, { email: input }])
      .where('deletedAt')
      .equals(null);
    return user;
  }

  async findUserByEmail(input: string): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne({
      email: input,
      deletedAt: null,
    });
    return user;
  }

  async findUserByEmailConfirmation(code: UUID): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne({
      'emailConfirmation.confirmationCode': code,
      deletedAt: null,
    });
    return user;
  }

  async getUserByPassRecovery(code: UUID): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne({
      'passwordRecovery.confirmationCode': code,
      deletedAt: null,
    });
    return user;
  }
}
