const apiKey = 'b2b53bd45a55d897068125ae451620bec59272ca57ed4beabc0b33d9a623613b';
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
    const jobId = data.job._id;
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
    const jobId = data.job._id;
    return await waitForJob(jobId);
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
    return await waitForJob(jobId);
  } catch (err) {
    console.error(err.message);
  }
};

const waitForJob = async (jobId) => {
  const eventSource = new EventSource(`http://localhost:5000/api/job/status/${jobId}`);
  return new Promise((resolve, reject) => {
    eventSource.onmessage = (event) => {
      const jobData = JSON.parse(event.data);
      if (jobData.status === 'complete') {
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
// const espera = await fetchDrawnLoremJob("Draw me a cat");
// const espera = await fetchSortJob("lower to higher", [1,3,5,2]);

(async () => {
  const espera = await fetchDrawnLoremJob("Draw me a cat");
  console.log("valor de la peticion: ", espera);
})();