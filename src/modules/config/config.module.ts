import { Duration } from 'luxon';

export type ConfigurationType = ReturnType<typeof getSettings>;

const getSettings = () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  dbURL: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  port: parseInt(process.env.PORT!, 10) || 3000,
  passRecoveryExpiration: Duration.fromObject({ minutes: 10 }),
  emailExpiration: Duration.fromObject({ minutes: 10 }),
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  accessTokenDuration: +process.env.JWT_EXP_TIME_IN_MINUTES!,
  refreshTokenDuration: +process.env.REFRESHT_TIME_IN_MINUTES!,
  mailerHost: process.env.EMAIL_HOST,
  mailerLogin: process.env.EMAIL,
  mailerPass: process.env.EMAIL_PASS,
  confirmationCodesDomain: process.env.CONFIRMATION_CODES_DOMAIN,
});

export default getSettings;
