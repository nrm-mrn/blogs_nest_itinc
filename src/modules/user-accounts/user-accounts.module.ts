import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersQueryRepository } from './infrastructure/query/users.query-repository';
import { UsersRepository } from './infrastructure/users.repository';
import { BasicAuthGuard } from './guards/basic/basic-auth.guard';
import { HashService } from './application/passHash.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../config/config.module';
import { DeviceAuthSession, SessionSchema } from './domain/session.entity';
import { AuthController } from './api/auth.controller';
import { DevicesSecurityController } from './api/devices-security.controller';
import { JwtAuthGuard } from './guards/bearer/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/bearer/jwt-refresh-token-guard';
import { EmailTemplates } from '../notifications/email.templates';
import { EmailService } from '../notifications/email.service';
import { AuthService } from './application/auth.service';
import { SessionsService } from './application/devices-security.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { DevicesSecurityRepository } from './infrastructure/devices-security.repository';
import { SessionsQueryRepository } from './infrastructure/query/devices-security.query-repository';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from './constants/auth-token.inject-constants';
import { UsersExternalService } from './application/users.external-service';
import { JwtStrategy } from './guards/bearer/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    NotificationsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: DeviceAuthSession.name, schema: SessionSchema },
    ]),
  ],
  controllers: [UsersController, AuthController, DevicesSecurityController],
  providers: [
    {
      provide: ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        return new JwtService({
          secret: configService.get('jwtAccessSecret'),
          signOptions: {
            expiresIn: `${configService.get('accessTokenDuration')}s`,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        return new JwtService({
          secret: configService.get('jwtRefreshSecret'),
          signOptions: {
            expiresIn: `${configService.get('refreshTokenDuration')}s`,
          },
        });
      },
      inject: [ConfigService],
    },
    UsersService,
    UsersExternalService,
    UsersQueryRepository,
    UsersRepository,
    BasicAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
    RefreshTokenGuard,
    HashService,
    EmailTemplates,
    EmailService,
    AuthService,
    SessionsService,
    DevicesSecurityRepository,
    SessionsQueryRepository,
  ],
  exports: [BasicAuthGuard, JwtAuthGuard, UsersExternalService],
})
export class UserAccountsModule {}
