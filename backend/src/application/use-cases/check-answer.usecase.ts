import { Inject, Injectable } from "@nestjs/common";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { GAME_SESSION_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class CheckAnswerUseCase {
    constructor(@Inject(GAME_SESSION_REPOSITORY) private readonly sessionRepo: GameSessionRepository) {}

    execute(sessionId: string, answer: string) {
        const session = this.sessionRepo.getSession(sessionId);

        if(!session) return { message: "Invalid session" };
        
        try {
            return session.answer(answer);
        } catch (error: any) {
            return { message: error.message };
        }
    }
}