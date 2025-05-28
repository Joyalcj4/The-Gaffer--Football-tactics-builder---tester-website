export async function evaluateTactics(tacticsData) {
    const response = await fetch('http://localhost:5500/api/ai/evaluate-tactics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tacticsData }),
    });
    return await response.json();
}