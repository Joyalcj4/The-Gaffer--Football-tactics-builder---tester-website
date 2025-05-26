const mongoose = require('mongoose');
const FormationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: String,
  players: Array,
  tactics: Object,
});
module.exports = mongoose.model('Formation', FormationSchema);