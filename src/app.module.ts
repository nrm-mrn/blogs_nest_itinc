import { configModule } from './config-dynamic-module';
import { DynamicModule, Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './core/exceptions/filters/all-exceptions.filter';
import { DomainHttpExceptionFilter } from './core/exceptions/filters/domain-exception.filter';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { TestingApiModule } from './testing/testingAPI.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerExceptionFilter } from './core/exceptions/filters/throttler-exceptions.filter';
import { ApiRequestsStorage } from './modules/user-accounts/infrastructure/apiRequests.repository';
import { CoreConfig } from './core/core.config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    configModule,
    CoreModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: CoreConfig) => ({
        uri: configService.mongoURI,
        dbName: configService.dbName,
      }),
      inject: [CoreConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [UserAccountsModule],
      useFactory: (configService: CoreConfig, storage: ApiRequestsStorage) => ({
        throttlers: [
          {
            ttl: configService.requestsTTL,
            limit: configService.requestsLimit,
          },
        ],
        storage,
      }),
      inject: [CoreConfig, ApiRequestsStorage],
    }),
    BloggersPlatformModule,
    UserAccountsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionFilter,
    },
  ],
})
export class AppModule {
  static async forRoot(coreConfig: CoreConfig): Promise<DynamicModule> {
    return {
      module: AppModule,
      imports: [...(coreConfig.includeTestingModule ? [TestingApiModule] : [])],
    };
  }
}
