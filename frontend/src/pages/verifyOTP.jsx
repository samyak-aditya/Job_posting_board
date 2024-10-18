import React from 'react';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

const VerifyOTP = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center" style={{ height: '100vh' }}>
        
        
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Verify Your Identity
            </Typography>
            <Typography variant="body1">
              Please enter the OTP sent to your email or mobile number to verify your identity.
            </Typography>
          </Box>
        </Grid>

       
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              padding: 3,
              boxShadow: 3,
              maxWidth: '400px',
              margin: 'auto',
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Verify OTP
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
              Enter the OTP sent to your email or mobile number
            </Typography>
            
           
            <form>
              <TextField
                fullWidth
                label="Email OTP"
                variant="outlined"
                margin="normal"
                InputProps={{ startAdornment: <Email /> }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Verify Email OTP
              </Button>

             
              <TextField
                fullWidth
                label="Mobile OTP"
                variant="outlined"
                margin="normal"
                InputProps={{ startAdornment: <Phone /> }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Verify Mobile OTP
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VerifyOTP;
