import style from './ApiKeyPage.module.css';
import { useState, useEffect } from 'react';
import { TextField, Typography, Container, Box, CssBaseline, Link } from '@mui/material';

const ApiKeyPage = () =>{
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApiKey = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            setError('No token found. Please log in.');
            return;
          }
    
          try {
            const response = await fetch('http://localhost:5000/api/auth/apikey', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`, // Attach JWT
                'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
              throw new Error(data.msg || 'Failed to fetch API key');
            }
            setApiKey(data.apiKey);
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchApiKey();
      }, []);

    return(
        <div className={style.apiKeyWrapper}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
                <Typography component="h1" variant="h5">Your API key</Typography>
                {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="APIkey"
                        label="APIkey"
                        name="APIkey"
                        autoFocus
                        value={apiKey}
                        sx={{ marginTop: 2 }}
                    />
            </Box>
            </Container>
        </div>
    )
}

export default ApiKeyPage;