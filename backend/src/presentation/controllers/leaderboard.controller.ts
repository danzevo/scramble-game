import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { GetLeaderboardUseCase } from "src/application/use-cases/get-leaderboard.usecase";
import { LeaderBoardRepository } from "src/domain/repositories/leaderboard.repository";
import { LeaderboardEntryDto } from "../dto/leaderboard.dto";
import { LEADERBOARD_REPOSITORY } from "src/domain/repositories/token";

@Controller('scramble/leaderboard')
export class LeaderboardController {
    constructor(
        private readonly getLeaderboardUseCase: GetLeaderboardUseCase,
        @Inject(LEADERBOARD_REPOSITORY)
        private readonly leaderboardRepository: LeaderBoardRepository,
    ) { }

    @Get()
    async getTop(
        @Query('limit') limit = '10',
    ): Promise<LeaderboardEntryDto[]> {
        const boards = await this.getLeaderboardUseCase.execute(Number(limit));
        return boards.map((item, index) => ({
            ...item,
            rank: index + 1,
        }));
    }

    @Get(':userId/rank')
    async getRank(@Param('userId') userId: string): Promise<LeaderboardEntryDto & { rank: number }> {
        const player = await this.leaderboardRepository.getPlayerStats(userId);
        if (!player) throw new Error('Player not found');
        const rank = await this.leaderboardRepository.getRank(userId);
        return { ...player, rank };
    }
}