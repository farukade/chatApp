import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

config();
const port = process.env.PORT;
const { log } = console;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'socket'));

  app.enableCors();
  
  await app.listen(port || 3000);
  log("ChatApp Running on:- " + await app.getUrl())
}
bootstrap();
