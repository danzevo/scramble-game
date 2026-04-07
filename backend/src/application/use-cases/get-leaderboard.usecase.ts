import { Inject, Injectable } from "@nestjs/common";
import { Leaderboard } from "src/domain/entities/leaderboard.entity";
import { LeaderBoardRepository } from "src/domain/repositories/leaderboard.repository";
import { LEADERBOARD_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class GetLeaderboardUseCase {
    constructor(
        @Inject(LEADERBOARD_REPOSITORY)
        private readonly leaderboardRepository: LeaderBoardRepository
    ) {}

    async execute(limit: number = 10): Promise<Leaderboard[]> {
        return this.leaderboardRepository.getTopPlayers(limit);
    }
}