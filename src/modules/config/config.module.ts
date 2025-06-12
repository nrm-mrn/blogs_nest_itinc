import { Duration } from 'luxon';

export type ConfigurationType = ReturnType<typeof getSettings>;

const getSettings = () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  dbURL: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  port: parseInt(process.env.PORT!, 10) || 3000,
  passRecoveryExpiration: Duration.fromObject({ minutes: 10 }),
  emailExpiration: Duration.fromObject({ minutes: 10 }),
  adminUsername: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiration: process.env.JWT_EXP_TIME_IN_MINUTES,
  mailerHost: process.env.EMAIL_HOST,
  mailerLogin: process.env.EMAIL,
  mailerPass: process.env.EMAIL_PASS,
  confirmationCodesDomain: process.env.CONFIRMATION_CODES_DOMAIN,
  refreshTokenDuration: +process.env.REFRESHT_TIME_IN_MINUTES!,
});

export default getSettings;
