<script setup>
import { onMounted, ref } from 'vue';
import { useGame } from './composables/useGame';
import DifficultySelect from './components/DifficultySelect.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';

const {
  init,
  loadWord,
  submit,
  scrambled,
  score,
  streak,
  result,
  timeLeft,
  startTimer,
  stopTimer,
} = useGame();

const difficulty = ref('easy');

onMounted(async() => {
  await init();
  await loadWord(difficulty.value);
  startTimer(handleTimeout);
});

async function changeDifficulty(val) {
  try {
    difficulty.value = val;
    await loadWord(difficulty.value);
  } catch (err) {
    console.error("Error changing difficulty:", err);
  }
}

async function newWord() {
  try {
    await loadWord(difficulty.value);
    startTimer(handleTimeout);
  } catch (err) {
    console.error("Error loading new word:", err);
  }
}

function handleTimeout() {
  result.value = "Time's Up!";
}
</script>
<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
    <div class="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
      <h1 class="text-3xl font-bold text-center mb-6">
        🧩 Scramble Game
      </h1>
      <DifficultySelect @change="changeDifficulty"/>
      <GameBoard 
        :scrambled="scrambled"
        :result="result"
        :timeLeft="timeLeft"
        :streak="streak"
        @submit="submit"
        @new-word="newWord"
      />
      <ScoreBoard
        :score="score"
        :streak="streak"
      />
    </div>
  </div>
</template>