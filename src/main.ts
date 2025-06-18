import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSetup } from './setup/app.setup';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './modules/config/config.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  appSetup(app);
  const configService = app.get(ConfigService<ConfigurationType>);
  const port = configService.get('port', { infer: true }) as number;

  await app.listen(port);
}
void bootstrap();
