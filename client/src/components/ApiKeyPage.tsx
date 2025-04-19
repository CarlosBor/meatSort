import style from './ApiKeyPage.module.css';
import { useState, useEffect } from 'react';
import { TextField, Typography, Container, Box, CssBaseline } from '@mui/material';

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
            const response = await fetch('http://localhost:5000/api/api/apikey', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
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
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
          }
        };
    
        fetchApiKey();
      }, []);

    return(
        <div className={style.apiKeyWrapper}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '600px',
                    bgcolor: '#282828',
                    borderRadius: 2,
                    boxShadow: 3,
                    padding: 3
                }}>
                    <Typography component="h1" variant="h5">Your API Key</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="APIkey"
                        label="API Key"
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
