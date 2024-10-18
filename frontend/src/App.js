import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar,ThemeProvider, Toolbar, Button, Container, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Signup from './pages/signup';
import Login from './pages/login';
import CreateInterview from './pages/createInterviews';
import logo from './assets/logo.jpeg';
import theme from './assets/theme';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
   
    console.log('Logged out');
    handleProfileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <img src={logo} alt="logo" style={{ width: 200, marginRight: 20 }} />
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/create-interview">
              Create Interview
            </Button>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiMenuItem-root': {
                    '&:focus': {
                      backgroundColor: '#f98949',
                      color: 'white',
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-interview" element={<CreateInterview />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
