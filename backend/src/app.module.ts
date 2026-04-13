import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/typeorm/typeorm.module';
import { ScrambleController } from './presentation/controllers/scramble.controller';
import { WordRepositoryImpl } from './infrastructure/database/typeorm/word.repository.impl';
import { CheckAnswerUseCase } from './application/use-cases/check-answer.usecase';
import { GetScrambleUseCase } from './application/use-cases/get-scramble.usecase';
// import { GameSessionStore } from './infrastructure/game-session.store';
import { GAME_SESSION_REPOSITORY, LEADERBOARD_REPOSITORY, WORD_REPOSITORY } from './domain/repositories/token';
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
import { LeaderboardOrmEntity } from './infrastructure/database/typeorm/entities/leaderboard.orm-entity';
import { LeaderboardController } from './presentation/controllers/leaderboard.controller';
import { LeaderboardRepositoryImpl } from './infrastructure/database/typeorm/leaderboard.repository.impl';
import { GetLeaderboardUseCase } from './application/use-cases/get-leaderboard.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetUsernameUseCase } from './application/use-cases/set-username.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaderboardOrmEntity]),
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
  controllers: [ScrambleController, HealthController, LeaderboardController],
  providers: [
    GetScrambleUseCase,
    CheckAnswerUseCase,
    CreateSessionUseCase,
    GetLeaderboardUseCase,
    ScrambleService,
    SetUsernameUseCase,
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
    },
    {
      provide: LEADERBOARD_REPOSITORY,
      useClass: LeaderboardRepositoryImpl,
    }
  ]
})
export class AppModule { }
