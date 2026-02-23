import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/typeorm/typeorm.module';
import { ScrambleController } from './presentation/controllers/scramble.controller';
import { WordRepositoryImpl } from './infrastructure/database/typeorm/word.repository.impl';

@Module({
  imports: [DatabaseModule],
  controllers: [ScrambleController],
  providers: [WordRepositoryImpl],
})
export class AppModule {}
