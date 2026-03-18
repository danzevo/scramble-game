import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/typeorm/typeorm.module';
import { ScrambleController } from './presentation/controllers/scramble.controller';
import { WordRepositoryImpl } from './infrastructure/database/typeorm/word.repository.impl';
import { CheckAnswerUseCase } from './application/use-cases/check-answer.usecase';
import { GetScrambleUseCase } from './application/use-cases/get-scramble.usecase';
// import { GameSessionStore } from './infrastructure/game-session.store';
import { GAME_SESSION_REPOSITORY, WORD_REPOSITORY } from './domain/repositories/token';
import { CreateSessionUseCase } from './application/use-cases/create-session.usecase';
import { RedisModule } from './infrastructure/redis/redis.module';
import { GameSessionRedisStore } from './infrastructure/game-session.redis.store';
import { HealthController } from './presentation/controllers/health.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ScrambleService } from './domain/services/scramble.service';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
          DatabaseModule, 
          RedisModule,
          TerminusModule,
          LoggerModule,
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'docs'),
            serveRoot: '/docs',
          }),
          ThrottlerModule.forRoot({
            throttlers: [
              {                
                ttl: 60,
                limit: 20,
              },
            ],
          }),
  ],
  controllers: [ScrambleController, HealthController],
  providers: [
    GetScrambleUseCase,
    CheckAnswerUseCase,
    CreateSessionUseCase,
    ScrambleService,
    {
      provide: WORD_REPOSITORY,
      useClass: WordRepositoryImpl,
    },
    {
      provide: GAME_SESSION_REPOSITORY,
      useClass: GameSessionRedisStore,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
