import { Inject, Injectable } from "@nestjs/common";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { GAME_SESSION_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class CreateSessionUseCase {
    constructor(
        @Inject(GAME_SESSION_REPOSITORY)
        private readonly sessionRepo: GameSessionRepository
    ) {}

    execute() {
        const sessionId = this.sessionRepo.createSession();
        return { sessionId };
    }
}