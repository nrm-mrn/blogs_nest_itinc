import { NestExpressApplication } from '@nestjs/platform-express';

export function proxySetup(app: NestExpressApplication) {
  app.set('truest proxy', true);
}
