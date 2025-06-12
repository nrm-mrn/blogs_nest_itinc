import { INestApplication } from '@nestjs/common';
import { swaggerSetup } from './swagger.setup';
import { pipesSetup } from './pipes.setup';
import { cookieParserSetup } from './cookie.setup';

export function appSetup(app: INestApplication) {
  cookieParserSetup(app);
  pipesSetup(app);
  swaggerSetup(app);
}
