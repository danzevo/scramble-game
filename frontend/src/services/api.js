const BASE = 'http://localhost:3000';

export async function createSession() {
    const res = await fetch(`${BASE}/scramble/session`);
    return res.json();
}

export async function getScramble(sessionId, difficulty) {
    const res = await fetch(`${BASE}/scramble?difficulty=${difficulty}`, {
        headers: { 'session-id': sessionId }
    });

    return res.json();
}

export async function checkAnswer(sessionId, answer) {
    const res = await fetch(`${BASE}/scramble/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-id': sessionId,
        },
        body: JSON.stringify({ answer })
    });

    return res.json();
}