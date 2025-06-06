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
});

export default getSettings;
