import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `http://localhost:5174`,
    credentials: true,
    //all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET','PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
  app.use(cookieParser())
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 1}))
  await app.listen(3000);
}
bootstrap();
