# meatSort

## Project Description

**meatSort** is a joke project satirizing the usage of AI. It provides three services via API endpoints:
- Text generation (`lorem-style` content)
- Simple image generation (drawing tasks)
- Sorting of arrays

Users query these endpoints with the type of content they want and some comments, and users of the site complete these jobs, returning the content to the original user.

## Installation Instructions

This is a **monorepo** project developed with **Docker**, **Vite** (with **React**) on the frontend, **Express** for the server, and **MongoDB** for storage.

### Prerequisites

- Docker (for containerization)
- Node.js
- npm/yarn (for package management)

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CarlosBor/meatSort
   ```

2. **Navigate to the project directory:**
   ```bash
   cd https://github.com/CarlosBor/meatSort
   ```

3. **Build and start the Docker containers:**
   ```bash
   docker-compose up --build
   ```

4. **The app should now be running on** `http://localhost:5000`.

## Usage Instructions

The three most important endpoints are:

- **`/api/job/lorem`** — For generating lorem-style content.
- **`/api/job/draw`** — For creating drawing tasks.
- **`/api/job/sort`** — For sorting tasks.

Additionally, when waiting for content after querying, **EventSource** is used to listen for real-time updates on job status.

Example of using EventSource:
```javascript
const eventSource = new EventSource(`http://localhost:5000/api/job/status/${jobId}?apiKey=${apiKey}`);
```

## Examples

### Fetch Lorem Job
```javascript
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
```

### Fetch Drawing Job (using `react-canvas-draw`)
```javascript
const fetchDrawnJob = async (comments) => {
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
```

### Fetch Sort Job
```javascript
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
```

## Technologies Used

- **Frontend**: React, Material UI, TypeScript
- **Backend**: Express, Node.js, MongoDB
- **Other**: Docker, Vite, react-canvas-draw, dnd (drag and drop)

## Contributing

I wouldn't expect any contributions in a thousand years. Please do something useful with your time instead.

## License

MIT License