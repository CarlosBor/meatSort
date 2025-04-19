const User = require('../models/User');

const validateApiKey = async (req, res, next) => {
  console.log(req.query);
  const apiKey = (req.body && req.body.apiKey) || req.query.apiKey || req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ msg: 'API key is required' });
  }

  try {

    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(403).json({ msg: 'Invalid API key' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during API key validation' });
  }
};

module.exports = validateApiKey;