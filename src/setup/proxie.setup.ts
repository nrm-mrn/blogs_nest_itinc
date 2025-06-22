import { NestExpressApplication } from '@nestjs/platform-express';

export function proxySetup(app: NestExpressApplication) {
  app.set('trust proxy', true);
  //throttler to bypass grok rate limits
  // app.use(async (req, res, next) => {
  //   await new Promise((res) => setTimeout(res, 500));
  //   next();
  // });
}
