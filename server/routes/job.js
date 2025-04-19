const express = require('express');
const router = express.Router();
const validateApiKey = require('../utils/apiKeyValidator');
const {
  createJob,
  findJobs,
  getJobById,
  completeJob,
  jobStatusStream,
} = require('../controllers/jobController');

router.post('/lorem', validateApiKey, createJob('lorem'));
router.post('/draw', validateApiKey, createJob('draw'));
router.post('/sort', validateApiKey, createJob('sortable'));

router.get('/findjobs', findJobs);
router.get('/:jobId', getJobById);
router.post('/complete', completeJob);
router.get('/status/:jobId', validateApiKey, jobStatusStream);

module.exports = router;
