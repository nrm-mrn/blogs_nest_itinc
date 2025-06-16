import { JwtService } from '@nestjs/jwt';
import { HashService } from './passHash.service';
import { UsersService } from './users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from 'src/modules/notifications/email.templates';
import { LoginDto } from '../dto/login.dto';
import { AuthSuccessDto } from '../dto/auth-success.dto';
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from 'src/core/exceptions/domain-exceptions';
import { DomainExceptionCode } from 'src/core/exceptions/domain-exception-codes';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import mongoose from 'mongoose';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { CreateSessionDto } from '../dto/create-session.dto';
import { SessionsService } from './devices-security.service';
import { UserInputModel } from '../dto/user-input.dto';
import { UUID } from 'crypto';
import { ConfirmPasswordDto } from '../dto/confirm-password.dto';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from '../constants/auth-token.inject-constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passHashService: HashService,
    @Inject(ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtAccesTokService: JwtService,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private readonly jwtRefreshTokService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly mailerService: MailerService,
    private readonly templateFactory: EmailTemplates,
  ) {}

  async checkCredentials(credentials: LoginDto): Promise<AuthSuccessDto> {
    const user = await this.usersService.getUserByLoginOrEmail(
      credentials.loginOrEmail,
    );
    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'Wrong login or password',
      });
    }
    const isValidPass = await this.passHashService.compareHash(
      credentials.password,
      user.passwordHash,
    );
    if (!isValidPass) {
      throw new DomainException({
        code: DomainExceptionCode.Unauthorized,
        message: 'Wrong login or password',
      });
    }
    const rtInput: CreateRefreshTokenDto = {
      userId: user._id.toString(),
      deviceId: new mongoose.Types.ObjectId().toString(),
      iat: new Date().getTime(),
    };
    const accTInput: CreateAccessTokenDto = {
      id: user._id.toString(),
    };
    const accessToken = this.jwtAccesTokService.sign(accTInput);
    const refreshToken = this.jwtRefreshTokService.sign(rtInput);

    const sessionInput: CreateSessionDto = {
      deviceId: rtInput.deviceId,
      userId: rtInput.userId,
      iat: new Date(rtInput.iat),
      ip: credentials.ip,
      title: credentials.title,
    };
    await this.sessionsService.saveSession(sessionInput);

    return { accessToken, refreshToken };
  }

  async registerUser(newUserDto: UserInputModel): Promise<{ userId }> {
    const { userId } = await this.usersService.createUser(newUserDto);

    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new DomainException({
        code: DomainExceptionCode.InternalServerError,
        message: 'Failed to create a new user entry',
      });
    }

    const emailConfirmation = await this.usersService.createEmailConfirmation(
      user.email,
    );

    const email = this.templateFactory.generateRegistrationEmail(
      emailConfirmation.confirmationCode,
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bloggers platform registration',
      html: email,
    });
    // .catch((err) => console.error(`error sending email: ${err}`));

    return { userId };
  }

  async confirmEmail(code: string): Promise<void> {
    const confirmationCode = code as UUID;
    await this.usersService.confirmEmail(confirmationCode);
    return;
  }

  async resendConfirmation(email: string): Promise<void> {
    const newConfirmation =
      await this.usersService.createEmailConfirmation(email);
    const emailTemplate = this.templateFactory.generateRegistrationEmail(
      newConfirmation.confirmationCode,
    );
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bloggers platform registration',
      html: emailTemplate,
    });
    // .catch((err) => console.error(`error sending email: ${err}`));
    return;
  }

  async reissueTokensPair(token: string): Promise<AuthSuccessDto> {
    const payload =
      this.jwtRefreshTokService.decode<CreateRefreshTokenDto>(token);

    await this.sessionsService.getSession(payload.deviceId, payload.iat);

    const rtInput: CreateRefreshTokenDto = {
      userId: payload.userId,
      deviceId: new mongoose.Types.ObjectId().toString(),
      iat: new Date().getTime(),
    };
    const refreshToken = this.jwtRefreshTokService.sign(rtInput);
    const accessToken = this.jwtAccesTokService.sign({ id: payload.userId });
    await this.sessionsService.refreshSession(payload.deviceId, rtInput.iat);
    return { accessToken, refreshToken };
  }

  async recoverPassword(email: string): Promise<void> {
    const recoveryObj = await this.usersService.setPasswordRecovery(email);
    if (!recoveryObj) {
      return;
    }
    const emailTemplate = this.templateFactory.generatePassRecoveryEmail(
      recoveryObj.confirmationCode,
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Blogs service password recovery request',
      html: emailTemplate,
    });
    // .catch((err) => console.error(`Error sending email: ${err}`));
    return;
  }

  async confirmPassword(input: ConfirmPasswordDto): Promise<void> {
    await this.usersService.confirmPassword(input);
  }
}
