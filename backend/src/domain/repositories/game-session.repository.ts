import { GameSession } from "../entities/game-session.entity";

export interface GameSessionRepository {
    createSession(): string;
    getSession(sessionId: string): GameSession | null;
    save(sessionId: string, session: GameSession): void;
}