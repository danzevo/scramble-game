import { WordOrmEntity } from "../entities/word.orm-entity";
import { AppDataSource } from "../typeorm.datasource";

async function seed() {
    await AppDataSource.initialize();

    const repo = AppDataSource.getRepository(WordOrmEntity);

    const words = [
        { text: "apple", difficulty: "easy" },        
        { text: "table", difficulty: "easy" },
        { text: "chair", difficulty: "easy" },

        { text: "database", difficulty: "medium" },
        { text: "network", difficulty: "medium" },
        { text: "backend", difficulty: "medium" },

        { text: "architecture", difficulty: "hard" },
        { text: "synchronization", difficulty: "hard" },
        { text: "microservices", difficulty: "hard" },
    ];

    await repo.insert(words);

    console.log("✅ Words seeded successfully");

    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error(err);
})