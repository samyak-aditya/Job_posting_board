import React from 'react';
import { TextField, Button, Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { User, Mail, Users, Phone } from 'lucide-react';

const Signup = () => {
  return (
    <Grid container spacing={2} style={{ height: '100vh' }}>
      
      <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
        <Box sx={{ maxWidth: '400px' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography variant="body1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </Typography>
        </Box>
      </Grid>

    
      <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
        <Card 
          sx={{ 
            width: '450px', 
            p: 2, 
            borderRadius: 2, 
            border: '1px solid', 
            borderColor: 'primary.main'
          }}
        >
          <CardContent>
            <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="body2" textAlign="center" mb={2}>
              Lorem Ipsum is simply dummy text
            </Typography>

           
            <Box component="form" sx={{ mt: 1 }}>
              <TextField 
                fullWidth 
                placeholder="Name" 
                margin="normal" 
                InputProps={{ 
                  startAdornment: <User />,
                  style: { 
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px', 
                  },
                }} 
              />
              <TextField 
                fullWidth 
                placeholder="Phone No." 
                margin="normal" 
                InputProps={{ 
                  startAdornment: <Phone />,
                  style: { 
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  },
                }} 
              />
              <TextField 
                fullWidth 
                placeholder="Company Name" 
                margin="normal" 
                InputProps={{ 
                  startAdornment: <User />,
                  style: { 
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  },
                }} 
              />
              <TextField 
                fullWidth 
                placeholder="Company Email" 
                margin="normal" 
                type="email"
                InputProps={{ 
                  startAdornment: <Mail />,
                  style: { 
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  },
                }} 
              />
              <TextField 
                fullWidth 
                placeholder="Employee Size" 
                margin="normal" 
                InputProps={{ 
                  startAdornment: <Users />,
                  style: { 
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  },
                }} 
              />
              <Typography variant="body2" textAlign="center" mt={2}>
                By clicking on proceed you will accept our{' '}
                <a href="#terms" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Terms & Conditions
                </a>
              </Typography>
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, mb: 2 }}
              >
                Proceed
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
