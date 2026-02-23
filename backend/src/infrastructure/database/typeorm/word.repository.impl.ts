import { Injectable } from "@nestjs/common";
import { WordRepository } from "src/domain/repositories/word.repository";
import { Repository } from "typeorm";
import { WordOrmEntity } from "./entities/word.orm-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Word } from "src/domain/entities/word.entity";

@Injectable()
export class WordRepositoryImpl implements WordRepository {
    constructor(
        @InjectRepository(WordOrmEntity)
        private repo: Repository<WordOrmEntity>
    ) {}

    async getRandomWord(difficulty: string): Promise<Word> {
        const result = await this.repo
            .createQueryBuilder("w")
            .where("w.difficulty = :difficulty", { difficulty })
            .orderBy("RANDOM()")
            .getOne()

        if(!result) {
            throw new Error('No words found in database')
        }
        
        return new Word(
            result.id,
            result.text,
            result.difficulty,
        )
    }
}