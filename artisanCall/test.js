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
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to validate API key');
    }
    const jobId = data.job.jobId;
    return await waitForJob(jobId);
  } catch (err) {
    console.error(err.message);
  }
};

const fetchDrawnLoremJob = async (comments) => {
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
    const jobId = data.job.jobId;
    return await waitForJob(jobId);
  } catch (err) {
    console.error(err.message);
  }
};

const waitForJob = async (jobId) => {
  const eventSource = new EventSource(`http://localhost:5000/api/job/status/${jobId}`);
  console.log("Reaches the wait");
  return new Promise((resolve, reject) => {
    eventSource.onmessage = (event) => {
      console.log("Messages reach");
      const jobData = JSON.parse(event.data);
      console.log("JobData is: ");
      console.log(jobData);
      if (jobData.status === 'complete') {
        console.log("Aight it actually completes WTF");
        eventSource.close();
        resolve(jobData.result);
      }
    };
  });
}
// fetchTestEndpoint();
// fetchLoremJob("Make it funny");
// fetchJobs();
// fetchJob('8c061d3939aab9cce1ba50434b37cc10');
// const espera = await fetchArtisanLoremJob("Make it funny"); 


(async () => {
  const espera = await fetchDrawnLoremJob("Draw me a cat");
  console.log("Hm");
  console.log(espera);
})();