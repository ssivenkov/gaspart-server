import * as session from 'express-session';
import * as passport from 'passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'keyword',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    origin: [process.env.CORS_ORIGIN],
  });

  const config = new DocumentBuilder()
    .setTitle('Аква термикс')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
