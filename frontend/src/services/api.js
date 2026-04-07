import { getOrCreateUserId } from "../composables/useGame";

const BASE = 'http://localhost:3000/api';

export async function createSession() {
    const res = await fetch(`${BASE}/scramble/session`, {
        method: 'POST',
        headers: { 'user-id': getOrCreateUserId() }
    });
    const data = await res.json();
    return data.sessionId;
}

export async function getScramble(sessionId, difficulty) {
    const res = await fetch(`${BASE}/scramble?difficulty=${difficulty}`, {
        headers: { 'session-id': sessionId, 'user-id': getOrCreateUserId() }
    });

    return res.json();
}

export async function checkAnswer(sessionId, answer) {
    const res = await fetch(`${BASE}/scramble/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-id': sessionId,
            'user-id': getOrCreateUserId(),
        },
        body: JSON.stringify({ answer })
    });

    return res.json();
}