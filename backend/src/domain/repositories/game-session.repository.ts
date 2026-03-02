import { GameSession } from "../entities/game-session.entity";

export interface GameSessionRepository {
    createSession(): Promise<string>;
    getSession(sessionId: string): Promise<GameSession | null>;
    save(sessionId: string, session: GameSession): Promise<void>;
}