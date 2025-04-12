const apiKey = '1c595ee76f76f6cde0ad8d6bf430fba9922cc7b0b3cccd9d20dbcb804962980e';
const {EventSource} = require('eventsource');

const fetchTestEndpoint = async () => {  
  try {
    const response = await fetch('http://localhost:5000/api/api/testendpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }) // Send the API key in the request body
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data); // If successful, print the response
    } else {
      throw new Error(data.msg || 'Failed to validate API key');
    }
  } catch (err) {
    console.error(err.message);
  }
};

const fetchLoremJob = async (comments) => {  
  try {
    const response = await fetch('http://localhost:5000/api/job/lorem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey, comments })
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      throw new Error(data.msg || 'Failed to validate API key');
    }
  } catch (err) {
    console.error(err.message);
  }
};

const fetchJobs = async () =>{
  try {
    const response = await fetch('http://localhost:5000/api/job/findjobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      throw new Error(data.msg || 'Failed to validate API key');
    }
  } catch (err) {
    console.error(err.message);
  }
}

const fetchJob = async (jobId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/job/${jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(jobId);
    console.log("Goddamnit");
    console.log(data.job);
  } catch (err) {
    console.error(err.message);
  }
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
    if (response.ok) {
      console.log(data);
    } else {
      throw new Error(data.msg || 'Failed to validate API key');
    }
    const jobId = data.job.jobId;
    const eventSource = new EventSource(`http://localhost:5000/api/job/status/${jobId}`);
  eventSource.onmessage = (event) => {
    const jobData = JSON.parse(event.data);
    console.log(jobData.status);
    if (jobData.status === 'complete') {
      console.log("Data is: ", jobData.result);
      console.log("Finished");
      eventSource.close();
    }
  };

  } catch (err) {
    console.error(err.message);
  }
};

// fetchTestEndpoint();
// fetchLoremJob("Make it funny");
// fetchJobs();
// fetchJob('8c061d3939aab9cce1ba50434b37cc10');
fetchArtisanLoremJob("Make it funny");