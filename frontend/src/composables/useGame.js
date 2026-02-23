import { ref } from "vue";
import * as api from "../services/api";

export function useGame() {
    const sessionId = ref("");
    const scrambled = ref("");
    const score = ref(0);
    const streak = ref(0);
    const result = ref("");

    const correctSound = new Audio('/correct.mp3');
    const wrongSound = new Audio('/wrong.mp3');

    const timeLeft = ref(30);
    let timer = null;

    function startTimer(onTimeout) {
        clearInterval(timer);
        timeLeft.value = 30;

        timer = setInterval(() => {
            timeLeft.value--;

            if(timeLeft.value <= 0) {
                clearInterval(timer);
                onTimeout();
            }
        }, 1000)
    }

    function stopTimer() {
        clearInterval(timer);
    }

    async function init() {
        const data = await api.createSession();
        sessionId.value = data.sessionId;
    }

    async function loadWord(difficulty) {
        const data = await api.getScramble(sessionId.value, difficulty);
        scrambled.value = data.scrambled;
        result.value = "";
    }

    async function submit(answer) {
        const data = await api.checkAnswer(sessionId.value, answer);

        if(typeof data.score === 'number') {
            score.value = data.score;
        }
        
        streak.value = data.streak;

        if(data.message) {
            result.value = data.message;
            return
        }

        if(data.correct) {
            result.value = "Correct!";  
            correctSound.play();      
        } else {
            result.value = "Wrong!";        
            wrongSound.play();
        }            
    }

    return { init, loadWord, submit, scrambled, score, streak, result, timeLeft, startTimer, stopTimer };
}