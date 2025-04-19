const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter both email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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
};

const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'Please enter both email and password.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: `Passwords don't match.` });
  }

  try {
    const user = await User.registerUser(email, password); // Assuming this returns the user
    res.json({ msg: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error.' });
  }
};

module.exports = {
  login,
  signup,
};
