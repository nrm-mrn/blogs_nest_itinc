import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './infrastructure/users.repository';
import { BasicAuthGuard } from './guards/basic/basic-auth.guard';
import { HashService } from './application/passHash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DeviceAuthSession, SessionSchema } from './domain/session.entity';
import { AuthController } from './api/auth.controller';
import { DevicesSecurityController } from './api/devices-security.controller';
import { JwtAuthGuard } from './guards/bearer/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/bearer/jwt-refresh-token-guard';
import { EmailTemplates } from '../notifications/email.templates';
import { NotificationsModule } from '../notifications/notifications.module';
import { DevicesSecurityRepository } from './infrastructure/devices-security.repository';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from './constants/auth-token.inject-constants';
import { UsersExternalService } from './application/users.external-service';
import { JwtStrategy } from './guards/bearer/jwt.strategy';
import { ApiRequest, ApiRequestSchema } from './domain/apiRequest.entity';
import { ApiRequestsStorage } from './infrastructure/apiRequests.repository';
import { GetAllUsersQueryHandler } from './application/queries/get-all-users.query';
import { GetUserInfoQueryHandler } from './application/queries/get-user-info.query';
import { GetUserQueryHandler } from './application/queries/get-user.query';
import { CreateUserByAdminHandler } from './application/usecases/create-user.usecase';
import { DeleteUserHandler } from './application/usecases/delete-user.usecase';
import { RegisterUserHandler } from './application/usecases/register-user.usecase';
import { ResendEmailConfirmationHandler } from './application/usecases/resend-email-confirmation.usecase';
import { LoginUserHandler } from './application/usecases/login-user.usecase';
import { ConfirmUserEmailHandler } from './application/usecases/confirm-user-email.usecase';
import { ReissueTokensHandler } from './application/usecases/reissue-tokens.usecase';
import { RecoverPasswordHandler } from './application/usecases/recover-password.usecase';
import { ConfirmPasswordHandler } from './application/usecases/confirm-new-password.usecase';
import { LogoutCommandHandler } from './application/usecases/logout-user.usecase';
import { LogoutAnotherSessionHandler } from './application/usecases/logout-another-session.usecase';
import { LogoutOtherSessionHandler } from './application/usecases/logout-all-other-sessions.usecase';
import { UserAccountConfig } from './config/user-account.config';
import { GetUserSessionsQueryHandler } from './application/queries/get-all-user-sessions.query';

const queries = [
  GetAllUsersQueryHandler,
  GetUserInfoQueryHandler,
  GetUserQueryHandler,
  GetUserSessionsQueryHandler,
];
const useCases = [
  CreateUserByAdminHandler,
  DeleteUserHandler,
  RegisterUserHandler,
  ResendEmailConfirmationHandler,
  LoginUserHandler,
  ConfirmUserEmailHandler,
  ReissueTokensHandler,
  RecoverPasswordHandler,
  ConfirmPasswordHandler,
  LogoutCommandHandler,
  LogoutAnotherSessionHandler,
  LogoutOtherSessionHandler,
];

@Module({
  imports: [
    JwtModule.register({}),
    NotificationsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: DeviceAuthSession.name, schema: SessionSchema },
    ]),
    MongooseModule.forFeature([
      { name: ApiRequest.name, schema: ApiRequestSchema },
    ]),
  ],
  controllers: [UsersController, AuthController, DevicesSecurityController],
  providers: [
    UserAccountConfig,
    {
      provide: ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
      useFactory: (configService: UserAccountConfig) => {
        return new JwtService({
          secret: configService.jwtAccessSecret,
          signOptions: {
            expiresIn: `${configService.accessTokenDuration}s`,
          },
        });
      },
      inject: [UserAccountConfig],
    },
    {
      provide: REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
      useFactory: (configService: UserAccountConfig) => {
        return new JwtService({
          secret: configService.jwtRefreshSecret,
          signOptions: {
            expiresIn: `${configService.refreshTokenDuration}s`,
          },
        });
      },
      inject: [UserAccountConfig],
    },
    UsersService,
    UsersExternalService,
    UsersRepository,
    BasicAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
    RefreshTokenGuard,
    HashService,
    EmailTemplates,
    DevicesSecurityRepository,
    ApiRequestsStorage,
    ...queries,
    ...useCases,
  ],
  exports: [
    BasicAuthGuard,
    JwtAuthGuard,
    UsersExternalService,
    ApiRequestsStorage,
    UserAccountConfig,
  ],
})
export class UserAccountsModule {}
