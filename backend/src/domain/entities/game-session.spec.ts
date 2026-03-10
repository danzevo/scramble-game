import { GameSession } from "./game-session.entity"

describe('GameSession', () => {
    let session: GameSession;

    beforeEach(() => {
        session = new GameSession();
        session.startNewWord('apple');
    });

    it('should return correct answer', () => {
        const result = session.answer('apple');
        expect(result.correct).toBe(true);
        expect(result.score).toBe(10);
    });

    it('should return incorrect answer', () => {
        const result = session.answer('banana');
        expect(result.correct).toBe(false);
        expect(result.streak).toBe(0);
    });

    it('should reset score if expired', () => {
        session.startTime = Date.now() - 31 * 1000;
        const result = session.answer('apple');
        expect(result.correct).toBe(false);
        expect(result.score).toBe(0);
    });

    it('should give bonus every 3 correct answers', () => {
        session.answer('apple');
        session.startNewWord('apple');
        session.answer('apple');
        session.startNewWord('apple');
        const result = session.answer('apple');

        expect(result.score).toBe(50);
    })
})