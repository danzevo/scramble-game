import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LeaderBoardRepository } from "src/domain/repositories/leaderboard.repository";
import { LeaderboardOrmEntity } from "./entities/leaderboard.orm-entity";
import { Repository } from "typeorm";
import { Leaderboard } from "src/domain/entities/leaderboard.entity";
import { randomUUID } from "crypto";

Injectable()
export class LeaderboardRepositoryImpl implements LeaderBoardRepository {
    constructor(
        @InjectRepository(LeaderboardOrmEntity)
        private readonly leaderboardOrmRepository: Repository<LeaderboardOrmEntity>,
    ) {}

    async getTopPlayers(limit: number): Promise<Leaderboard[]> {
        const ormEntities = await this.leaderboardOrmRepository.find({
            order: { totalScore: 'DESC' },
            take: limit,
        });

        return ormEntities.map(this.mapToDomain);
    }

    async getPlayerStats(userId: string): Promise<Leaderboard | null> {
        const ormEntity = await this.leaderboardOrmRepository.findOne({ where: { userId } });
        return ormEntity ? this.mapToDomain(ormEntity) : null;
    }

    async updatePlayerStats(userId: string, score: number, streak: number): Promise<void> {
        let ormEntity = await this.leaderboardOrmRepository.findOne({ where: { userId } });
        if (!ormEntity) {
            ormEntity = new LeaderboardOrmEntity();
            ormEntity.id = randomUUID();
            ormEntity.userId = userId;
            ormEntity.username = 'Anonymous';
            ormEntity.totalScore = 0;
            ormEntity.gamesPlayed = 0;
            ormEntity.bestStreak = 0;
            ormEntity.createdAt = new Date();
        }
        // ormEntity.totalScore += score;
        ormEntity.totalScore += 10;
        if(streak % 3 === 0) {
            ormEntity.totalScore += 20;
        }
        ormEntity.gamesPlayed += 1;
        if (streak > ormEntity.bestStreak) {
            ormEntity.bestStreak = streak;
        }
        ormEntity.updatedAt = new Date();
        await this.leaderboardOrmRepository.save(ormEntity);
    }

    async getRank(userId: string): Promise<number> {
        const player = await this.getPlayerStats(userId);
        if (!player) return -1; // Not found
        const count = await this.leaderboardOrmRepository
            .createQueryBuilder('l')
            .where('l.totalScore > :score', { score: player.totalScore })
            .getCount();
        return count + 1; // Rank starts from 1
    }

    async createOrUpdate(player: Leaderboard): Promise<void> {
        const ormEntity = this.mapToOrm(player);
        await this.leaderboardOrmRepository.save(ormEntity);
    }

    private mapToDomain(ormEntity: LeaderboardOrmEntity): Leaderboard {
        return new Leaderboard(
            ormEntity.id,
            ormEntity.userId,
            ormEntity.username,
            ormEntity.totalScore,
            ormEntity.gamesPlayed,
            ormEntity.bestStreak,
            ormEntity.createdAt,
            ormEntity.updatedAt,
        )
    }

    private mapToOrm(domainEntity: Leaderboard): LeaderboardOrmEntity {
        const ormEntity = new LeaderboardOrmEntity();
        ormEntity.id = domainEntity.id;
        ormEntity.userId = domainEntity.userId;
        ormEntity.username = domainEntity.username;
        ormEntity.totalScore = domainEntity.totalScore;
        ormEntity.gamesPlayed = domainEntity.gamesPlayed;
        ormEntity.bestStreak = domainEntity.bestStreak;
        ormEntity.createdAt = domainEntity.createdAt;
        ormEntity.updatedAt = domainEntity.updatedAt
        return ormEntity;
    }
}