import { Inject, Injectable } from "@nestjs/common";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { LeaderBoardRepository } from "src/domain/repositories/leaderboard.repository";
import { GAME_SESSION_REPOSITORY, LEADERBOARD_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class CheckAnswerUseCase {
    constructor(
        @Inject(GAME_SESSION_REPOSITORY) private readonly sessionRepo: GameSessionRepository,
        @Inject(LEADERBOARD_REPOSITORY) private readonly leaderboardRepo: LeaderBoardRepository,
    ) {}

    async execute(sessionId: string, answer: string) {
        const session = await this.sessionRepo.getSession(sessionId);

        if(!session) return { message: "Invalid session" };
        
        try {
            const result = session.answer(answer);
            await this.sessionRepo.save(sessionId, session);
            
            if(result.correct && result.score > 0) {
                await this.leaderboardRepo.updatePlayerStats(session.userId, result.score, result.streak);
            }
            return result;
        } catch (error: any) {
            return { message: error.message };
        }
    }
}