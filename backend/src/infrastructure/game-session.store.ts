import { GameSession } from 'src/domain/entities/game-session.entity';
import { GameSessionRepository } from 'src/domain/repositories/game-session.repository';
import { v4 as uuidv4 } from 'uuid';

export class GameSessionStore implements GameSessionRepository{
    private session: Map<string, GameSession> = new Map();

    createSession(): string {
        const id = uuidv4();

        this.session.set(id, new GameSession());
        return id;
    }

    getSession(sessionId: string): GameSession | null {
        return this.session.get(sessionId) || null;
    }

    save(sessionId: string, session: GameSession): void {        
        this.session.set(sessionId, session);
    }
}