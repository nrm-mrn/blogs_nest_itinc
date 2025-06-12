import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.entity';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersQueryRepository } from './infrastructure/query/users.query-repository';
import { UsersRepository } from './infrastructure/users.repository';
import { BasicAuthGuard } from './guards/basic/basic-auth.guard';
import { HashService } from './application/passHash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationsModule } from '../notifications/notifications.module';
import { DevicesSecurityRepository } from './infrastructure/devices-security.repository';
import { SessionsQueryRepository } from './infrastructure/query/devices-security.query-repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<ConfigurationType>) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: {
            expiresIn: `${configService.get('jwtExpiration')}m`,
          },
        };
      },
      inject: [ConfigService],
    }),
    NotificationsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: DeviceAuthSession.name, schema: SessionSchema },
    ]),
  ],
  controllers: [UsersController, AuthController, DevicesSecurityController],
  providers: [
    UsersService,
    UsersQueryRepository,
    UsersRepository,
    BasicAuthGuard,
    JwtAuthGuard,
    RefreshTokenGuard,
    HashService,
    EmailTemplates,
    EmailService,
    AuthService,
    SessionsService,
    DevicesSecurityRepository,
    SessionsQueryRepository,
  ],
  exports: [BasicAuthGuard, JwtAuthGuard],
})
export class UserAccountsModule {}
