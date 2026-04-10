<script setup>
import { onMounted, ref } from 'vue';
import { getLeaderboard, getMyRank } from '../services/api';

const leaderboard = ref([]);
const myRank = ref(null);

const loadLeaderboard = async() => {
    try {
        leaderboard.value = await getLeaderboard(10);
        myRank.value = await getMyRank();
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

onMounted(async () => {
    await loadLeaderboard();
});
</script>
<template>
    <div class="leaderboard max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold text-center mb-6 text-white">🏆 Leaderboard</h2>

        <div v-if="myRank" class="my-rank bg-blue-900 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-semibold mb-2 text-blue-300">Your Rank</h3>
            <div class="grid grid-cols-2 gap-4 text-white">
                <div>
                    <p class="text-sm text-gray-300">Rank</p>
                    <p class="text-xl font-bold text-yellow-400">#{{ myRank.rank }}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-300">Score</p>
                    <p class="text-xl font-bold text-green-400">{{ myRank.totalScore }}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-300">Games</p>
                    <p class="text-xl font-bold">{{ myRank.gamesPlayed }}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-300">Best Streak</p>
                    <p class="text-xl font-bold text-purple-400">{{ myRank.bestStreak }}</p>
                </div>
            </div>
        </div>
        <div class="top-players">
            <h3 class="text-lg font-semibold mb-4 text-white">Top Players</h3>
            <div class="space-y-2">
                <div v-for="(player, index) in leaderboard" :key="player.id"
                    class="player-row flex items-center justify-between bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition">
                    
                    <div class="flex items-center gap-3">
                        <span class="rank text-lg font-bold text-yellow-400 min-w-[40px]">#{{ index + 1 }}</span>
                        <span class="username text-white font-medium">{{ player.username }}</span>
                    </div>
                    <div class="flex items-center gap-4 text-sm">
                        <span class="score text-green-400 font-semibold">{{ player.totalScore }}</span>
                        <span class="games text-gray-300">({{ player.gamesPlayed }})</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>