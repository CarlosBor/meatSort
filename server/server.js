const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');
const jobRoute = require('./routes/job');

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // Update this with the URL of your front-end (or '*' for all origins)
    methods: ['GET', 'POST'],
    credentials: true,  // If you need to send cookies with the request
  }));

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/api', apiRoute);
app.use('/api/job', jobRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
