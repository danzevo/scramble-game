export class GameSession {
    constructor(
        public currentWord: string | null = null,
        public startTime: number | null = null,
        public score: number = 0,
        public streak: number = 0,
        public answered: boolean = false,
    ) {}

    startNewWord(word: string) {
        this.currentWord = word;
        this.startTime = Date.now();
        this.answered = false;
    }

    isExpired(): boolean {
        if(!this.startTime) return true;
        return (Date.now() - this.startTime) / 1000 > 30;
    }

    answer(word: string): {correct: boolean, score: number, streak: number} {
        if(!this.currentWord) {
            throw new Error('No active word');
        }

        if(this.answered) {
            throw new Error('Already answered this word');
        }

        if(this.isExpired()) {
            this.score = 0;
            this.streak = 0;
            this.answered = true;

            return { correct: false, score: this.score, streak: this.streak };
        }

        const isCorrect = word.toLowerCase() === this.currentWord.toLowerCase();

        if(isCorrect) {
            this.streak += 1;
            this.score += 10;

            if(this.streak % 3 === 0) {
                this.score += 20;
            }
        } else {
            this.streak = 0;
        }

        this.answered = true;

        return { correct: isCorrect, score: this.score, streak: this.streak };
    }
}