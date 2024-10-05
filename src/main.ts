import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {json, urlencoded} from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const logger = new Logger('Bootstrap');

  // Enable logging for incoming requests
  app.useLogger(logger);
  await app.listen(3001);
  logger.log('Application is running on port 3000');
}
bootstrap();
