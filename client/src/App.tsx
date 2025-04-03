import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import ApiKeyPage from './components/ApiKeyPage';

import style from './App.module.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={
        <div className={style.loginWrapper}>
          <SignIn />
        </div>
          } />
        <Route path="/signup" element={
        <div className={style.loginWrapper}>
          <SignUp />
        </div>} />
        <Route path="/dashboard/*" element={<div className={style.loginWrapper}><Dashboard /></div>}>
            <Route path="apikey" element={<ApiKeyPage />} /> {/* Nested Route */}
          </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
