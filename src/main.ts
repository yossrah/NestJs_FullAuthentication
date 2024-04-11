import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException, ValidationFilter } from './utils/filter.validation';
import { ValidationError } from 'class-validator';
import 'reflect-metadata'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/auth')
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)];
        });
        return new ValidationException(errMsg);
      },
    }),
  );
  
  const port=process.env.PORT||3000
  await app.listen(port);
  
}
bootstrap();
