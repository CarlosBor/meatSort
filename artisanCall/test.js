const apiKey = '1f4b1d81227298c528c3340f0d8bb29555f1eaefebbba8560d0aa1665be10f84';
const {EventSource} = require('eventsource');

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
      return data;
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
      return data;
    } else {
      throw new Error(data.msg || 'Failed to validate API key');
    }
  } catch (err) {
    console.error(err.message);
  }
}
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

const waitForJob = async (jobId, apiKey) => {
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
}

// fetchTestEndpoint();
// fetchLoremJob("Make it funny");
// fetchJobs();
// fetchJob('8c061d3939aab9cce1ba50434b37cc10');
// const espera = await fetchArtisanLoremJob("Make it funny"); 
// const espera = await fetchDrawnjob("Draw me a cat");
// const espera = await fetchSortJob("lower to higher", [1,3,5,2]);

(async () => {
  const espera = await fetchSortJob("Draw me a cat", [1,2,"casa",5]);
  console.log("valor de la peticion: ", espera);
})();