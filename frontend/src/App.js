import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, ThemeProvider, Box, Toolbar, Button, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Signup from './pages/signup';
import CreateInterview from './pages/createInterviews';
import logo from './assets/logo.jpeg';
import theme from './assets/theme';
import VerifyOTP from './pages/verifyOTP';
import LogoutButton from './component/logout'; // New component for logout

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  // Check for JWT token in local storage
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your actual token key
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
              <img src={logo} alt="logo" style={{ width: 200, marginRight: 20 }} />
             
              <div style={{ flexGrow: 1 }} />
              <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    mt: 1.5,
                    '& .MuiMenuItem-root': {
                      '&:focus': {
                        backgroundColor: '#f98949',
                        color: 'white',
                        zIndex: '100'
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                {/* Use LogoutButton component */}
                <LogoutButton setIsAuthenticated={setIsAuthenticated} handleProfileMenuClose={handleProfileMenuClose} />
              </Menu>
            </Toolbar>
          </AppBar>

          <Container>
            <Routes>
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/verifyotp" element={<VerifyOTP />} />
              <Route path="/create-interview" element={
                isAuthenticated ? <CreateInterview /> : <Navigate to="/signup" />
              } />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
