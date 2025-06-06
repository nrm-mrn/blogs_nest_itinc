import { INestApplication } from '@nestjs/common';
import { swaggerSetup } from './swagger.setup';
import { pipesSetup } from './pipes.setup';

export function appSetup(app: INestApplication) {
  pipesSetup(app);
  swaggerSetup(app);
}
