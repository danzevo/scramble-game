import { DataSource } from "typeorm";
import { WordOrmEntity } from "./entities/word.orm-entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    username: "postgres",
    password: "12345",
    database: "scramble_game",
    entities: [WordOrmEntity],
    migrations: [
        'src/infrastructure/database/typeorm/migrations/*.ts',
    ],
    synchronize: false,
})

//run migration generate
//npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/infrastructure/database/typeorm/migrations/init -d src/infrastructure/database/typeorm/typeorm.datasource.ts

//run migration
//npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/infrastructure/database/typeorm/typeorm.datasource.ts