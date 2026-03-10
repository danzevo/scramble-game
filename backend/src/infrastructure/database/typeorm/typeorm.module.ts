import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordOrmEntity } from "./entities/word.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "postgres", //service name in docker-compose
            port: 5432,
            username: "postgres",
            password: "12345",
            database: "scramble_game",
            entities: [WordOrmEntity],
            synchronize: false,
            // migrations:['dist/migrations/*.js'],
            // logging:true,
        }),
        TypeOrmModule.forFeature([WordOrmEntity])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}