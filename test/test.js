const fetchTestEndpoint = async () => {  
    const apiKey = 'b6fff1fe3e18d0e6212a196b2140cf17e4207c2c48ef1e623a72148438016d73';
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/testendpoint', {
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
      setError(err.message);
    }
  };
  
  fetchTestEndpoint();
  