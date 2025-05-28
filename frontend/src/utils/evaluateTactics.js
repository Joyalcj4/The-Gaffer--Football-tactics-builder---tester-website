const API_URL = import.meta.env.VITE_API_URL;
export async function evaluateTactics(tacticsData) {
    const response = await fetch(`${API_URL}/api/ai/evaluate-tactics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tacticsData }),
    });
    return await response.json();
}