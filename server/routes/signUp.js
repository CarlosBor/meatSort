const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model set up
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();



module.exports = router;