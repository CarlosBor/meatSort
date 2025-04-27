import { Outlet, Link } from 'react-router-dom';
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button component={Link} to="/dashboard/docs" color="inherit" sx={{ marginRight: 2, '&:hover': { backgroundColor: '#1976d2', color:"inherit"}}} >
            Docs
          </Button>
          <Button component={Link} to="/dashboard/apikey" color="inherit" sx={{ marginRight: 2, '&:hover': { backgroundColor: '#1976d2', color:"inherit"}}} >
            API Keys
          </Button>
          <Button component={Link} to="/dashboard/jobs" color="inherit" sx={{ marginRight: 2, '&:hover': { backgroundColor: '#1976d2', color:"inherit"}}} >
            Jobs
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#282828',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
