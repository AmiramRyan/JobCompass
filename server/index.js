
const express = require('express');
const connectDB = require('./db');
const Job = require('./models/Job');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
