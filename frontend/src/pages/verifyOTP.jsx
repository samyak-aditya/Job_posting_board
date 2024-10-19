import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Grid2, InputAdornment } from '@mui/material';
import { Mail, Phone } from 'lucide-react'; // Updated to use lucide-react icons
import axios from 'axios';
import { Backend_url } from '../assets/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VerifyOTP = () => {
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailToken, setEmailToken] = useState(null);
  const [mobileToken, setMobileToken] = useState(null);
  const navigate = useNavigate();

  const storeJwtToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  useEffect(() => {
    if (emailVerified && mobileVerified) {
      const finalToken = emailToken || mobileToken;
      if (finalToken) {
        storeJwtToken(finalToken);
        console.log("token saved");
        setTimeout(() => {
          navigate('/create-interview');
        }, 2000);
      }
    }
  }, [emailVerified, mobileVerified, emailToken, mobileToken, navigate]);

  const handleEmailOtpSubmit = async (event) => {
    event.preventDefault();
    const email = localStorage.getItem('userEmail');

    try {
      const response = await axios.post(`${Backend_url}/verify-email-otp`, {
        email,
        otp: emailOtp,
      });

      console.log('Email OTP verification response:', response.data);
      if (response.data.token) {
        setEmailToken(response.data.token);
      }
      setEmailVerified(true);
    } catch (error) {
      console.error('Error verifying email OTP:', error);
    }
  };

  const handleMobileOtpSubmit = async (event) => {
    event.preventDefault();
    const phone = localStorage.getItem('userPhone');

    try {
      const response = await axios.post(`${Backend_url}/verify-mobile-otp`, {
        phone,
        otp: mobileOtp,
      });

      console.log('Mobile OTP verification response:', response.data);
      if (response.data.token) {
        setMobileToken(response.data.token);
      }
      setMobileVerified(true);
    } catch (error) {
      console.error('Error verifying mobile OTP:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={2} alignItems="center" style={{ height: '100vh' }}>
        <Grid2 item xs={12} md={6}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Verify Your Identity
            </Typography>
            <Typography variant="body1">
              Please enter the OTP sent to your email or mobile number to verify your identity.
            </Typography>
          </Box>
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Box
            sx={{
              border: '1px solid #0B66EF',
              borderRadius: 2,
              padding: 3,
              maxWidth: '400px',
              marginLeft: '50px',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Verify OTP
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
              Enter the OTP sent to your email or mobile number
            </Typography>

            <form onSubmit={handleEmailOtpSubmit}>
              <TextField
                fullWidth
                placeholder="Email" 
                variant="outlined"
                margin="normal"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Mail /></InputAdornment>,
                  endAdornment: emailVerified && (
                    <InputAdornment position="end">
                      <img src="https://cdn-icons-png.flaticon.com/512/14090/14090371.png" alt="Verified" width="20" />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: '#f0f0f0', 
                    borderColor: '#555', 
                  },
                }}
                disabled={emailVerified}
                helperText={emailVerified ? '✔ Verified' : ''}
              />
              {!emailVerified && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Verify Email OTP
                </Button>
              )}
            </form>

            <form onSubmit={handleMobileOtpSubmit}>
              <TextField
                fullWidth
                placeholder="Mobile" 
                variant="outlined"
                margin="normal"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>,
                  endAdornment: mobileVerified && (
                    <InputAdornment position="end">
                      <img src="https://cdn-icons-png.flaticon.com/512/14090/14090371.png" alt="Verified" width="20" />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: '#f0f0f0',
                    borderColor: '#555', 
                  },
                }}
                disabled={mobileVerified}
                helperText={mobileVerified ? '✔ Verified' : ''}
              />
              {!mobileVerified && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Verify Mobile OTP
                </Button>
              )}
            </form>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default VerifyOTP;
