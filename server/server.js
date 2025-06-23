require('dotenv').config();
const express = require('express');
const cors = require('cors');
const calculatorController = require('./controllers/calculatorController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', calculatorController.calculate);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});