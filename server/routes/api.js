const express = require('express');
const router = express.Router();
const { getApiKey } = require('../controllers/apiKeyController');

router.get('/apikey', getApiKey);

module.exports = router;