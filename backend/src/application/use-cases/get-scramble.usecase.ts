import { Inject, Injectable } from "@nestjs/common";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { GAME_SESSION_REPOSITORY, WORD_REPOSITORY } from "src/domain/repositories/token";
import { WordRepository } from "src/domain/repositories/word.repository";

@Injectable()
export class GetScrambleUseCase {
    constructor(
        @Inject(WORD_REPOSITORY)
        private readonly wordRepo: WordRepository,

        @Inject(GAME_SESSION_REPOSITORY)
        private sessionRepo: GameSessionRepository
    ) {}

    async execute(sessionId: string, difficulty: string) {
        const word = await this.wordRepo.getRandomWord(difficulty);

        const session = this.sessionRepo.getSession(sessionId);
        if(!session) return { message: "Invalid session" };

        session.startNewWord(word.text);
        this.sessionRepo.save(sessionId, session);

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