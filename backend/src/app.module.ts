import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/typeorm/typeorm.module';
import { ScrambleController } from './presentation/controllers/scramble.controller';
import { WordRepositoryImpl } from './infrastructure/database/typeorm/word.repository.impl';
import { CheckAnswerUseCase } from './application/use-cases/check-answer.usecase';
import { GetScrambleUseCase } from './application/use-cases/get-scramble.usecase';
import { GameSessionStore } from './infrastructure/game-session.store';
import { GAME_SESSION_REPOSITORY, WORD_REPOSITORY } from './domain/repositories/token';
import { CreateSessionUseCase } from './application/use-cases/create-session.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ScrambleController],
  providers: [
    GetScrambleUseCase,
    CheckAnswerUseCase,
    CreateSessionUseCase,
    {
      provide: WORD_REPOSITORY,
      useClass: WordRepositoryImpl,
    },
    {
      provide: GAME_SESSION_REPOSITORY,
      useClass: GameSessionStore,
    }
  ],
})
export class AppModule {}
