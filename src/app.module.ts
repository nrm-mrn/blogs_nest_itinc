import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/modules/config/config.module';
import { ConfigurationType } from 'src/modules/config/config.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './core/exceptions/filters/all-exceptions.filter';
import { DomainHttpExceptionFilter } from './core/exceptions/filters/domain-exception.filter';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { TestingApiModule } from './testing/testingAPI.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigurationType>) => ({
        uri: configService.get('dbURL'),
        dbName: configService.get('dbName'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigurationType>) => ({
        throttlers: [
          {
            ttl: configService.get<number>('requestsTtl')!,
            limit: configService.get<number>('requestsLimit')!,
          },
        ],
      }),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot({}),
    BloggersPlatformModule,
    UserAccountsModule,
    NotificationsModule,
    ConditionalModule.registerWhen(
      TestingApiModule,
      (env: NodeJS.ProcessEnv) => env.NODE_ENV !== 'production',
    ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
