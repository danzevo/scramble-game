import { GameSession } from 'src/domain/entities/game-session.entity';
import { GameSessionRepository } from 'src/domain/repositories/game-session.repository';
import { v4 as uuidv4 } from 'uuid';

export class GameSessionStore implements GameSessionRepository{
    private session: Map<string, GameSession> = new Map();

    async createSession(): Promise<string> {
        const id = uuidv4();

        this.session.set(id, new GameSession());
        return id;
    }

    async getSession(sessionId: string): Promise<GameSession | null> {
        return this.session.get(sessionId) || null;
    }

    async save(sessionId: string, session: GameSession): Promise<void> {        
        this.session.set(sessionId, session);
    }
}