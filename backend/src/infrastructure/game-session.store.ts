import { v4 as uuidv4 } from 'uuid';

interface SessionData {
    currentWord: string;
    score: number;
    streak: number;
    startTime: number;
    answered: boolean;
}

export class GameSessionStore {
    private static session: Map<string, SessionData> = new Map();

    static createSession(): string {
        const id = uuidv4();

        this.session.set(id, {
            currentWord: "",
            score: 0,
            streak: 0,
            startTime: 0,
            answered: false,
        })

        return id;
    }

    static getSession(sessionId: string): SessionData {
        return this.session.get(sessionId);
    }

    static updateSession(sessionId: string, data: Partial<SessionData>) {
        const session = this.session.get(sessionId);
        this.session.set(sessionId, { ...session, ...data })
    }
}