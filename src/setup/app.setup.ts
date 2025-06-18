import { swaggerSetup } from './swagger.setup';
import { pipesSetup } from './pipes.setup';
import { cookieParserSetup } from './cookie.setup';
import { proxySetup } from './proxie.setup';
import { NestExpressApplication } from '@nestjs/platform-express';

export function appSetup(app: NestExpressApplication) {
  cookieParserSetup(app);
  proxySetup(app);
  pipesSetup(app);
  swaggerSetup(app);
}
