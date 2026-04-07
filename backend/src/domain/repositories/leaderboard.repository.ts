import { Leaderboard } from "../entities/leaderboard.entity";

export interface LeaderBoardRepository {
    getTopPlayers(limit: number): Promise<Leaderboard[]>;
    getPlayerStats(userId: string): Promise<Leaderboard | null>;
    updatePlayerStats(userId: string, score: number, streak: number): Promise<void>;
    getRank(userId: string): Promise<number>;
    createOrUpdate(player: Leaderboard): Promise<void>;
}