import { Inject, Injectable } from "@nestjs/common";
import { GameSession } from "src/domain/entities/game-session.entity";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { GAME_SESSION_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class CreateSessionUseCase {
    constructor(
        @Inject(GAME_SESSION_REPOSITORY)
        private readonly sessionRepo: GameSessionRepository
    ) {}

    async execute(userId: string): Promise<string> {
        const sessionId = await this.sessionRepo.createSession();
        const session = new GameSession(userId);
        await this.sessionRepo.save(sessionId, session);
        return sessionId;
    }
}