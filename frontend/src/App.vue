<script setup>
import { onMounted, ref } from 'vue';
import { useGame } from './composables/useGame';
import DifficultySelect from './components/DifficultySelect.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import Leaderboard from './components/Leaderboard.vue';

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
const showLeaderboard = ref(false);

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
      <!-- <h1 class="text-3xl font-bold text-center mb-6">
        🧩 Scramble Game
      </h1> -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">
          🧩 Scramble
        </h1>
        <button @click="showLeaderboard = true" class="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold shadow-md">
          🏆 Top
        </button>
      </div>
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
      <!-- <hr class="my-6 border-gray-700">
      <Leaderboard/> -->
    <div v-if="showLeaderboard" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="relative w-full max-w-2xl">
        <button @click="showLeaderboard = false" class="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-white z-10 shadow-lg font-bold">
          X
        </button>
        <Leaderboard />
      </div>
    </div>
  </div>
</template>