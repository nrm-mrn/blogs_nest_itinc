import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationType } from '../config/config.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        return {
          transport: `smtps://${configService.get('mailerLogin')}:${configService.get('mailerPass')}@${configService.get('mailerHost')}`,
          defaults: {
            from: `"bloggers platform" <${configService.get('mailerLogin')}>`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class NotificationsModule {}
