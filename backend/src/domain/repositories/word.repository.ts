import { Word } from "../entities/word.entity";

export interface WordRepository {
    getRandomWord(difficulty: string): Promise<Word>;
}