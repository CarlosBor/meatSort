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
    try {
      const pendingJobs = await Job.find({ status: 'pending' });
      console.log(pendingJobs);
      if (pendingJobs.length === 0) {
        return res.status(404).json({ msg: 'No pending jobs found.' });
      }
  
      res.json({ jobs: pendingJobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error.' });
    }

  });

  router.get('/:jobId', async (req, res) => {
    const { jobId } = req.params;
    console.log(jobId);
  
    try {

      // Query for the specific job by its ID
      const job = await Job.findOne({jobId});
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      res.json({ job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  });

  module.exports = router;