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
import { EmailConfirmation } from '../domain/emailConfirmation.schema';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from 'src/modules/config/config.module';
import { Duration } from 'luxon';
import { UUID } from 'crypto';
import { PasswordRecovery } from '../domain/passRecovery.schema';
import { ConfirmPasswordDto } from '../dto/confirm-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: UserModelType,
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}

  async createUser(input: CreateUserDto): Promise<{ userId: string }> {
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
    const newUser = this.UserModel.createUser({
      email: input.email,
      login: input.login,
      passHash: hash,
    });
    const userId = await this.usersRepository.save(newUser);

    return { userId };
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

  async findUserById(id: string): Promise<UserDocument | null> {
    return this.usersRepository.findById(id);
  }

  async getUserByLoginOrEmail(input: string): Promise<UserDocument | null> {
    const user = await this.usersRepository.findUserByLoginOrEmail(input);
    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.usersRepository.findOrNotFoundFail(userId);
    await this.usersRepository.deleteUser(user);
  }

  async createEmailConfirmation(email: string): Promise<EmailConfirmation> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'User with provided email do not exist',
        extensions: [
          new Extension('User with provided email do not exist', 'email'),
        ],
      });
    }
    user.genEmailConfirmation(
      this.configService.get('emailExpiration') as Duration,
    );
    await this.usersRepository.save(user);
    return user.emailConfirmation as EmailConfirmation;
  }

  async confirmEmail(code: UUID): Promise<void> {
    const user = await this.usersRepository.findUserByEmailConfirmation(code);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'User with provided code does not exist',
        extensions: [
          new Extension('User with provided code does not exist', 'code'),
        ],
      });
    }
    user.confirmEmail();
    await this.usersRepository.save(user);
    return;
  }

  async setPasswordRecovery(email: string): Promise<PasswordRecovery | null> {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      return null;
    }
    user.genPasswordRecovery(
      this.configService.get('passRecoveryExpiration') as Duration,
    );
    await this.usersRepository.save(user);
    return user.passwordRecovery as PasswordRecovery;
  }

  async confirmPassword(input: ConfirmPasswordDto): Promise<void> {
    const user = await this.usersRepository.getUserByPassRecovery(input.code);
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: 'Incorrect recovery code',
        extensions: [new Extension('incorrect recovery code', 'recoveryCode')],
      });
    }
    const hash = await this.hashService.createHash(input.password);
    user.confirmPassword(hash);
    await this.usersRepository.save(user);
    return;
  }
}
