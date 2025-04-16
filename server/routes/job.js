const express = require('express');
const { jobEmitter } = require('../utils/jobEvents');
const Job = require('../models/Job');
const dotenv = require('dotenv');
const validateApiKey = require('../utils/apiKeyValidator');


dotenv.config();
const router = express.Router();

router.post('/lorem', async (req, res) => {
    const { apiKey, comments } = req.body;
    try{
      await validateApiKey(apiKey);
      const job = await Job.registerJob("lorem", {comments});
      res.json({ msg: 'Job registered successfully', job });
    } catch (error) {
      if(error.message==='Invalid API key'){
        res.status(400).json({ msg: 'Invalid API key' });
      } else {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
      }
    }
  });

  router.post('/draw', async (req, res) => {
    const { apiKey, comments } = req.body;
    try{
      await validateApiKey(apiKey);
      const job = await Job.registerJob("draw", {comments});
      res.json({ msg: 'Job registered successfully', job });
    } catch (error) {
      if(error.message==='Invalid API key'){
        res.status(400).json({ msg: 'Invalid API key' });
      } else {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
      }
    }
  });

  router.get('/findjobs', async (req, res) => {
    try {
      const pendingJobs = await Job.find({ status: 'pending' });
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
    try {
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

  // API route to mark a job as complete
  router.post('/complete', async (req, res) => {
    const { jobId, result } = req.body;
    // Emit job completed event
    jobEmitter.emit('jobCompleted', { jobId, result });
    try {
      console.log("jobId in deletion", jobId);
      // Delete the job from the collection
      await Job.deleteOne({ jobId });
      res.json({ message: 'Job marked as complete and deleted.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to delete job.' });
    }
  });

  //EventSource Router
  router.get('/status/:jobId', async (req, res) => {
    const { jobId } = req.params;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ${JSON.stringify({ jobId, status: 'pending' })}\n\n`);

    const handleJobCompleted = ({ jobId: completedId, result }) => {
      console.log("completeId",completedId);
      console.log("jobId",jobId);
      if (completedId === jobId) {
        res.write(`data: ${JSON.stringify({ jobId, status: 'complete', result })}\n\n`);
        res.end();
        jobEmitter.off('jobCompleted', handleJobCompleted);
      }
    };
    jobEmitter.on('jobCompleted', handleJobCompleted);
  });

  module.exports = router;