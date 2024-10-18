import React from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Link } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center" style={{ height: '100vh' }}>
       
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h3" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1">
              Enter your credentials to access your account. If you don't have an account, you can <Link href="/signup">Sign Up</Link> now.
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
              Login
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
              Enter your email and password to login
            </Typography>
            
            <form>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                InputProps={{ startAdornment: <span className="material-icons">email</span> }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                InputProps={{ startAdornment: <span className="material-icons">lock</span> }}
              />
              
              <Typography variant="caption" display="block" gutterBottom align="center" color="textSecondary">
                <Link href="/forgot-password">Forgot your password?</Link>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account? <Link href="/signup">Sign Up</Link>
              </Typography>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
