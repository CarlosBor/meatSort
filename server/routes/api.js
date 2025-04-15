const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

//Api key
router.get('/apikey', async (req, res) => {
    // Verify JWT token first (middleware or manual check)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json({ apiKey: user.apiKey });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  router.post('/testendpoint', async (req, res) => {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({ msg: 'API key is required' });
    }
  
    try {
      const user = await User.findOne({ apiKey });
  
      if (!user) {
        return res.status(404).json({ msg: 'API key not found' });
      }
  
      res.json({ msg: 'API key is valid', user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  });

  module.exports = router;