const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation'); // Your Mongoose model

// Save formation
router.post('/save', async (req, res) => {
  try {
    const { name, userId, players, tactics } = req.body;
    if (!userId || !name || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Upsert: update if exists, insert if not
    const result = await Formation.findOneAndUpdate(
      { userId, name },
      { players, tactics },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.json({ success: false, message: "No userId" });
    const formations = await Formation.find({ userId });
    res.json({ success: true, formations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;