// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

const LogoutButton = ({ setIsAuthenticated, handleProfileMenuClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logged out');
    localStorage.removeItem('jwtToken'); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication status
    handleProfileMenuClose();
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  );
};

export default LogoutButton;
