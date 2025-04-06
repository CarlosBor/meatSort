// utils/apiKeyValidator.js

const User = require('../models/User');

const validateApiKey = async (apiKey) => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const user = await User.findOne({ apiKey });
  if (!user) {
    throw new Error('Invalid API key');
  }

  return user;  // Return user info if the key is valid
};

module.exports = validateApiKey;
