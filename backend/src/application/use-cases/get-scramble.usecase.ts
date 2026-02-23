import { WordRepository } from "src/domain/repositories/word.repository";
import { GameSessionStore } from "src/infrastructure/game-session.store";

export class GetScrambleUseCase {
    constructor(private wordRepo: WordRepository) {}

    async execute(sessionId: string, difficulty: string) {
        const word = await this.wordRepo.getRandomWord(difficulty);

        GameSessionStore.updateSession(sessionId, {
            currentWord: word.text,
            startTime: Date.now(),
            answered: false,
        });

        return {
            scrambled: await this.scramble(word.text)
        }
    }

    async scramble(text: string) {
        return text
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("");
    }
}