import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/modules/config/config.module';
import { ConfigurationType } from 'src/modules/config/config.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './core/exceptions/filters/all-exceptions.filter';
import { DomainHttpExceptionFilter } from './core/exceptions/filters/domain-exception.filter';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigurationType>) => ({
        uri: configService.get('dbURL'),
        dbName: configService.get('dbName'),
      }),
      inject: [ConfigService],
    }),
    BloggersPlatformModule,
    UserAccountsModule,
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
