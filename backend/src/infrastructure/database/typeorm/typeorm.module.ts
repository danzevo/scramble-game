import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordOrmEntity } from "./entities/word.orm-entity";
import { LeaderboardOrmEntity } from "./entities/leaderboard.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "127.0.0.1",
            port: 5433,
            username: "postgres",
            password: "12345",
            database: "scramble_game",
            entities: [WordOrmEntity, LeaderboardOrmEntity],
            synchronize: false,
            // migrations:['dist/migrations/*.js'],
            // logging:true,
        }),
        TypeOrmModule.forFeature([WordOrmEntity, LeaderboardOrmEntity])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}