const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const formationRoutes = require('./routes/Formationroutes'); 
const aiRoutes = require('./routes/airoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/formation', formationRoutes);
app.use('/api/ai', aiRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
