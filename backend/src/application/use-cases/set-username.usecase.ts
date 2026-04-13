import { Inject, Injectable } from "@nestjs/common";
import { Leaderboard } from "src/domain/entities/leaderboard.entity";
import { LeaderBoardRepository } from "src/domain/repositories/leaderboard.repository";
import { LEADERBOARD_REPOSITORY } from "src/domain/repositories/token";

@Injectable()
export class SetUsernameUseCase {
    constructor(
        @Inject(LEADERBOARD_REPOSITORY)
        private readonly leaderboardRepository: LeaderBoardRepository
    ) { }

    async execute(userId: string, username: string): Promise<void> {
        let player = await this.leaderboardRepository.getPlayerStats(userId);

        if (player) {
            player.username = username;
        } else {
            player = Leaderboard.create(userId, username);
        }

        await this.leaderboardRepository.createOrUpdate(player);
    }
}