const { evaluateTactics } = require('../utils/geminiservices');
const express = require('express');
const router = express.Router();

router.post('/evaluate-tactics', async (req, res) => {
    const { tacticsData } = req.body;
    const result = await evaluateTactics(tacticsData);
    res.json(result);
});
module.exports = router;