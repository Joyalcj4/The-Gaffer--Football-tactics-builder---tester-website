const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAdAtXHJNSyf6IwnB2lTtBXBPev53nIYLE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function evaluateTactics(tacticsData) {
    // Improved prompt for detailed feedback
    const prompt = `
You are a football tactics expert. Given the following tactics, provide:
- A short feedback on their effectiveness in a competitive match.
- A score out of 100 for overall effectiveness.
- The main strengths (pros) of these tactics.
- The main weaknesses or vulnerabilities.
- Concrete suggestions to improve the tactics.

Respond in JSON format:
{
  "feedback": "...",
  "score": 0-100,
  "pros": ["..."],
  "vulnerabilities": ["..."],
  "suggestions": ["..."]
}

Tactics:
${JSON.stringify(tacticsData, null, 2)}
`;

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        // Parse Gemini's response
        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('No response from Gemini');

        // Try to parse the JSON from the response
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
            return JSON.parse(match[0]);
        } else {
            throw new Error('Could not parse feedback JSON');
        }
    } catch (err) {
        console.error('Gemini evaluation error:', err.response?.data || err.message);
        return {
            feedback: "AI evaluation failed.",
            score: 0,
            pros: [],
            vulnerabilities: [],
            suggestions: []
        };
    }
}

module.exports = { evaluateTactics };