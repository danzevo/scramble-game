export class LeaderboardEntryDto {
    id: string;
    userId: string;
    username: string;
    totalScore: number;
    gamesPlayed: number;
    bestStreak: number;
    rank?: number;
}