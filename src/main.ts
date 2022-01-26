import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  await app.listen(5000);
}
bootstrap();
