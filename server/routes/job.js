const express = require('express');
const Job = require('../models/Job');
const dotenv = require('dotenv');
const validateApiKey = require('../utils/apiKeyValidator');

dotenv.config();
const router = express.Router();

//Api key
router.post('/lorem', async (req, res) => {
    const { apiKey } = req.body;
    try{
      await validateApiKey(apiKey);
      const type = "lorem";
      const job = await Job.registerJob(type);
      res.json({ msg: 'Job registered successfully', job });
    } catch (error) {
      if(error.message==='Invalid API key'){
        res.status(400).json({ msg: 'Invalid API key' });
      } else {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
      }
    }}
  );

  router.get('/findjobs', async (req, res) => {
    console.log("Whew lad");
    res.json({ msg: "jobs queried"});
  });

  module.exports = router;