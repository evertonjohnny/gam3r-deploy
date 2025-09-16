import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormataFilter } from './filters/formata.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.useGlobalFilters(new FormataFilter())
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
