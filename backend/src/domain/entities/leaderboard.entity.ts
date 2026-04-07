export class Leaderboard {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly username: string,
        public totalScore: number,
        public gamesPlayed: number,
        public bestStreak: number,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ) {}

    static create(userId: string, username: string): Leaderboard {
        const now = new Date();
        return new Leaderboard(
            crypto.randomUUID(),
            userId,
            username,
            0,
            0,
            0,
            now,
            now,
        );
    }

    updateStats(score: number, streak: number) {
        this.totalScore += score;
        this.gamesPlayed += 1;
        if (streak > this.bestStreak) {
            this.bestStreak = streak;
        }
        this.updatedAt = new Date();
    }
}