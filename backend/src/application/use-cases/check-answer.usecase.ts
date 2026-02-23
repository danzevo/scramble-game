import { GameSessionStore } from "src/infrastructure/game-session.store";

export class CheckAnswerUseCase {
    execute(sessionId: string, answer: string) {
        const session = GameSessionStore.getSession(sessionId);

        if(!session) return { message: "Invalid session" };

        if(session.answered) {
            return { message: 'Already answered this word' }
        }

        if((Date.now() - session.startTime) / 1000 > 30) {
            session.streak = 0;
            session.score = 0;
            return { message: "Time Expired", score: session.score, streak: session.streak}
        }
        
        const correctWord = session.currentWord;

        if(!correctWord) {
            return { message: "No active game" };
        }

        const isCorrect = answer.toLowerCase() === correctWord.toLowerCase();

        if(isCorrect) {
            session.streak += 1;
            session.score += 10;

            if(session.streak % 3 === 0) {
                session.score += 20;
            }
        } else {
            session.streak = 0;
        }

        session.answered = true

        return {
            correct: isCorrect,
            score: session.score,
            streak: session.streak,
        };
    }
}