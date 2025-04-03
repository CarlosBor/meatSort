import { useState } from 'react';
import { Button, TextField, Typography, Container, Box, CssBaseline, Link } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("This the data: ");
      console.log(data);
      if (!response.ok) {
        setError(data.msg); // Show error message from server
      } else {
        // Store the JWT token and user data in localStorage/sessionStorage
        localStorage.setItem('token', data.token);
        // Optionally store user info as well
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the dashboard or another protected page
        window.location.href = '/dashboard'; // Example route
      }
    } catch (error) {
      setError('Failed to log in');
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit} sx={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Link href="/signup" variant="body2" sx={{ cursor: 'pointer' }}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
