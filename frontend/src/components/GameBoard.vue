<script setup>
import confetti from 'canvas-confetti';
import { ref, watch } from 'vue';

const props = defineProps({
    scrambled: String,
    result: String,
    timeLeft: Number,
    streak: Number,
});

const emit = defineEmits(['submit', 'new-word']);
const answer = ref('');
const shake = ref(false);

function submit() {
    emit('submit', answer.value);
    answer.value = '';
}

watch(() => props.result, (val) => {
    if(val === "Wrong!") {
        shake.value = true;
        setTimeout(() => {
            shake.value = false;
        }, 400);
    }
})

watch(() => props.streak, (val) => {
    if(val > 0 && val % 5 === 0) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        })
    }
})
</script>
<template>
    <div class="mt-4">
        <div class="text-right text-sm text-gray-400 mb-2">
            ⏳ {{ timeLeft }}s
        </div>
        <div 
            :class="[
                'text-center text-2xl font-semibold tracking-widest mb-4',
                shake ? 'animate-shake' : ''
            ]">
            {{  scrambled }}
        </div>
        <input 
            v-model="answer"
            placeholder="Type your answer"
            class="w-full bg-gray-700 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500">
        <div class="flex gap-3">
            <button
                @click="submit"
                class="flex-1 bg-green-600 hover:bg-green-700 transition rounded-lg py-2 font-semibold">
                Submit
            </button>
            <button
                @click="emit('new-word')"
                class="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-semibold"
            >
                New Word
            </button>
        </div>    

        <p class="mt-4 text-center font-semibold"
            :class="result === 'Correct!' ? 'text-green-400' : 'text-red-400'"
        >
            {{  result }}
        </p>
    </div>
</template>
