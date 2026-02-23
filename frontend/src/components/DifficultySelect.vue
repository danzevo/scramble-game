<script setup>
import { ref } from 'vue';

const emit = defineEmits(['change'])

const difficulty = ref('easy');
</script>
<template>
    <div class="mb-4">
        <label class="block text-sm mb-2 text-gray-400">
            Difficulty
        </label>

        <select
            v-model="difficulty"
            @change="emit('change', difficulty)"
            class="w-full bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
</template>