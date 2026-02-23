<script setup>
defineProps({
    score: Number,
    streak: Number,
});
</script>
<template>
    <div class="mt-6 flex justify-between bg-gray-700 rounded-xl p-4">
        <div>
            <p class="text-gray-400 text-sm">Score</p>
            <p class="text-xl font-bold">{{  score }}</p>
        </div>
        <div>
            <p class="text-gray-400 text-sm">Streak</p>
            <p class="text-xl font-bold">{{  streak }}</p>
        </div>
    </div>
</template>