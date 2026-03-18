import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-execption.filter';
// import { ThrottlerGuard } from '@nestjs/throttler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './infrastructure/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: WinstonModule.createLogger(winstonConfig)
    }
  );

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  
  const config = new DocumentBuilder()
    .setTitle('Scramble Game API')
    .setDescription('API documentation for Scramble Word Game')
    .setVersion('1.0')
    .addTag('scramble')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
