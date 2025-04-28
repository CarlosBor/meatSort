const EventSource = require('eventsource');
const fetch = require('node-fetch'); // You must install and require node-fetch

let apiKey = '';

const init = (key) => {
  apiKey = key;
};

const fetchArtisanLoremJob = async (comments) => {
    try {
      const response = await fetch('http://localhost:5000/api/job/lorem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, comments })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to validate API key');
      }
      const jobId = data.job._id;
      return await waitForJob(jobId, apiKey);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDrawnjob = async (comments) => {
    try {
      const response = await fetch('http://localhost:5000/api/job/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, comments })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to validate API key');
      }
      const jobId = data.job._id;
      return await waitForJob(jobId, apiKey);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchSortJob = async (comments, sortable) => {
    try {
      const response = await fetch('http://localhost:5000/api/job/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, comments, sortable })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to validate API key');
      }
      const jobId = data.job._id;
      return await waitForJob(jobId, apiKey);
    } catch (err) {
      console.error(err.message);
    }
  };

const waitForJob = async (jobId) => {
  const eventSource = new EventSource(`http://localhost:5000/api/job/status/${jobId}?apiKey=${apiKey}`);
  return new Promise((resolve, reject) => {
    eventSource.onmessage = (event) => {
      const jobData = JSON.parse(event.data);
      if (jobData.status === 'complete') {
        eventSource.close();
        resolve(jobData.result);
      }
    };
  });
};

module.exports = {
  init,
  fetchArtisanLoremJob,
  fetchDrawnjob,
  fetchSortJob
};
