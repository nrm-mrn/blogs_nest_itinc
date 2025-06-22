import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from '../infrastructure/users.repository';
import { HashService } from './passHash.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModelType } from '../domain/user.entity';
import {
  DomainException,
  Extension,
} from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async createUserDoc(input: CreateUserDto): Promise<UserDocument> {
    const uniqueLogin = await this.isLoginUnique(input.login);
    if (!uniqueLogin) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'Login already exists',
        extensions: [new Extension('Login already exist', 'login')],
      });
    }
    const uniqueEmail = await this.isEmailUnique(input.email);
    if (!uniqueEmail) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'Email already exists',
        extensions: [new Extension('Email already exist', 'email')],
      });
    }

    const hash = await this.hashService.createHash(input.password);
    return this.UserModel.createUser({
      email: input.email,
      login: input.login,
      passHash: hash,
    });
  }

  async isLoginUnique(login: string): Promise<boolean> {
    const loginRes = await this.usersRepository.findUserByLoginOrEmail(login);
    if (loginRes) {
      return false;
    }
    return true;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const emailRes = await this.usersRepository.findUserByLoginOrEmail(email);
    if (emailRes) {
      return false;
    }
    return true;
  }
}
