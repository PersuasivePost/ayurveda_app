require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());

// check required env vars early
const missing = [];
if (!process.env.MONGO_URI) missing.push('MONGO_URI');
if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');

if (missing.length) {
  console.error('ERROR: Missing required environment variable(s):', missing.join(', '));
  console.error('Create backend/.env with at least:\nMONGO_URI=...\nJWT_SECRET=...\nPORT=5000');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running'));

// mount auth routes
app.use('/api/auth', authRouter);

// connect and start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
