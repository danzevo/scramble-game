<script setup>
import { onMounted, ref } from 'vue';
import { useGame } from './composables/useGame';
import DifficultySelect from './components/DifficultySelect.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import Leaderboard from './components/Leaderboard.vue';
import { setUsername } from './services/api';

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
const username = ref('');
const isGameStarted = ref(false);
const errorMessage = ref('');

onMounted(async() => {
  await init();

  const savedUsername = localStorage.getItem('scramble_username');

  if(savedUsername) {
    username.value = savedUsername;

    await loadWord(difficulty.value);
    startTimer(handleTimeout);
    isGameStarted.value = true;
  }
});

async function startGame() {
  if (username.value.trim().length === 0) {
    errorMessage.value = 'Oops! Please enter a username to play.';
    return;
  }
  errorMessage.value = '';

  await setUsername(username.value);

  localStorage.setItem('scramble_username', username.value);

  await loadWord(difficulty.value);
  startTimer(handleTimeout);

  isGameStarted.value = true;
}

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
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6 relative">
    <div v-if="!isGameStarted" class="bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
      <hi class="text-3xl font-bold mb-6">🧩 Scramble</hi>
      <!-- <p class="text-gray-400 mb-4">Enter a username to begin</p> -->
      <p v-if="!errorMessage" class="text-gray-400 mb-4 transition-all">Enter a username to begin</p>
      <div v-else class="text-red-400 text-sm mb-4 bg-red-900/30 border border-red-500/50 p-2 rounded-lg animate-pulse transition-all mt-1">
        {{ errorMessage }}
      </div>
      <input v-model="username"
              @keyup.enter="startGame"
              placeholder="Player123"
              class="w-full bg-gray-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg">
      <button @click="startGame"
              class="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-bold text-lg shadow-md">
        Start Playing
      </button>
    </div>
    <div v-else class="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
      <!-- <h1 class="text-3xl font-bold text-center mb-6">
        🧩 Scramble Game
      </h1> -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">
          🧩 Scramble
        </h1>
        <p class="text-sm text-gray-400 mt-1">
          Playing as: <span class="text-green-400 font-semibold">{{ username }}</span>
        </p>
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