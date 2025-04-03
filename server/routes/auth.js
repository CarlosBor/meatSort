const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
//Test ACC:
//    qweqweqwe
//    qweqweqwe
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter both email and password.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token to client
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error.' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'Please enter both email and password.' });
  }
  if(password!=confirmPassword){
    return res.status(400).json({ msg: `Passwords don't match.`});
  }
  try {
    const user = User.registerUser(email, password);
    res.json({ msg: 'User registered successfully', user });
    console.log("Exito?");

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error.' });
  }
});

//Api key
router.get('/apikey', async (req, res) => {
  // Verify JWT token first (middleware or manual check)
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Use the decoded userId
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ apiKey: user.apiKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Assuming `apiKey` is passed in the body of the request
router.post('/testendpoint', async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ msg: 'API key is required' });
  }

  try {
    // Find the user with the matching apiKey
    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(404).json({ msg: 'API key not found' });
    }

    // If you find the user, you can respond accordingly
    res.json({ msg: 'API key is valid', user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;