import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { configValidationUtility } from 'src/setup/config-validation.utility';

export enum Environments {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

@Injectable()
export class CoreConfig {
  @IsNumber(
    {},
    {
      message: 'Set env variable PORT',
    },
  )
  port: number = Number(this.configService.get('PORT'));

  @IsEnum(Environments, {
    message:
      'Set correct NODE_ENV value, available values: ' +
      configValidationUtility.getEnumValues(Environments).join(', '),
  })
  nodeEnv: string = this.configService.get('NODE_ENV');

  @IsString({
    message: 'Set Env variable DB_URL to a valid mongodb connection string',
  })
  mongoURI: string = this.configService.get('DB_URL');

  @IsString({
    message: 'Set Env variable DB_URL to a valid mongodb connection string',
  })
  dbName: string = this.configService.get('DB_NAME');

  @IsBoolean({
    message:
      'Set env variable IS_SWAGGER_ENABLED to enable/disable swagger, example: true/false',
  })
  isSwaggerEnabled = configValidationUtility.convertToBoolean(
    this.configService.get('IS_SWAGGER_ENABLED'),
  ) as boolean;

  @IsBoolean({
    message:
      'Set env variable VERBOSE_ERRORS to enable/disable detailed error messages returned to frontend',
  })
  verboseErrors = configValidationUtility.convertToBoolean(
    this.configService.get('VERBOSE_ERRORS'),
  ) as boolean;

  @IsNumber(
    {},
    {
      message:
        'Set env variable THROTTLER_REQUESTS_TTL_IN_MS to limit number of allowed requests in a given timeframe',
    },
  )
  requestsTTL: number = Number(
    this.configService.get('THROTTLER_REQUESTS_TTL_IN_MS'),
  );

  @IsNumber(
    {},
    {
      message:
        'Set env variable THROTTLER_REQUESTS_LIMIT to limit number of allowed requests in a given timeframe',
    },
  )
  requestsLimit: number = Number(
    this.configService.get('THROTTLER_REQUESTS_LIMIT'),
  );

  @IsBoolean({
    message:
      'Set env variable INCLUDE_TESTING_MODULE to enable/disable testing module in the app',
  })
  includeTestingModule = configValidationUtility.convertToBoolean(
    this.configService.get('INCLUDE_TESTING_MODULE'),
  ) as boolean;

  constructor(private configService: ConfigService<any, true>) {
    configValidationUtility.validateConfig(this);
  }
}
