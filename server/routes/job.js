const express = require('express');
const Job = require('../models/Job');
const { jobEmitter } = require('../utils/jobEvents');
const validateApiKey = require('../utils/apiKeyValidator');

const router = express.Router();

router.post('/lorem', validateApiKey, async (req, res) => {
    const { comments } = req.body;
    try{
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

  router.post('/draw', validateApiKey, async (req, res) => {
    const { comments } = req.body;
    try{
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

  router.post('/sort', validateApiKey, async (req, res) => {
    const { comments, sortable } = req.body;
    try{
      const job = await Job.registerJob("sortable", {comments, sortable});
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
      const job = await Job.findOne({_id:jobId});
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
      res.json({ job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  });

  router.post('/complete', async (req, res) => {
    const { jobId, result } = req.body;
    console.log("This is the result"); 
    console.log(result);
    jobEmitter.emit('jobCompleted', { jobId, result });
    try {
      await Job.deleteOne({ _id:jobId });
      res.json({ message: 'Job marked as complete and deleted.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Failed to delete job.' });
    }
  });

  router.get('/status/:jobId', validateApiKey, async (req, res) => {
    console.log("Reaches");
    const { jobId } = req.params;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ${JSON.stringify({ jobId, status: 'pending' })}\n\n`);

    const handleJobCompleted = ({ jobId:completedId, result }) => {
      if (completedId === jobId) {
        res.write(`data: ${JSON.stringify({ jobId, status: 'complete', result })}\n\n`);
        res.end();
        jobEmitter.off('jobCompleted', handleJobCompleted);
      }
    };
    jobEmitter.on('jobCompleted', handleJobCompleted);
  });

  module.exports = router;