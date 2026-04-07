import { Inject } from "@nestjs/common";
import Redis from "ioredis";
import { GameSession } from "src/domain/entities/game-session.entity";
import { GameSessionRepository } from "src/domain/repositories/game-session.repository";
import { v4 as uuidv4 } from 'uuid';

export class GameSessionRedisStore implements GameSessionRepository {
    constructor(
        @Inject('REDIS_CLIENT') 
        private readonly redis: Redis,
    ) {}

    async createSession(): Promise<string> {
        const id = uuidv4();
        return id;
    }

    async getSession(sessionId: string): Promise<GameSession | null> {
        const data = await this.redis.get(sessionId);

        if(!data) return null;

        const parsed = JSON.parse(data);


        if(!parsed.userId) {
            parsed.userId = 'anonymous';
        }

        return new GameSession(
            parsed.userId,
            parsed.currentWord,
            parsed.startTime,
            parsed.score,
            parsed.streak,
            parsed.answered
        );
    }

    async save(sessionId: string, session: GameSession): Promise<void> {
        await this.redis.set(
            sessionId,
            JSON.stringify(session),
            'EX',
            60 * 60,
        )
    }
}