import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid2,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { User, Mail, Users, Phone } from 'lucide-react';
import axios from 'axios'; 
import { Backend_url } from '../assets/api';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeSize, setEmployeeSize] = useState('');
  const [loading, setLoading] = useState(false); 
  const [phoneError, setPhoneError] = useState(false); 
  const [employeeSizeError, setEmployeeSizeError] = useState(false); 

  const navigate = useNavigate(); 


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    
    const formData = {
      name,
      phone,
      companyName,
      email,
      employeeSize,
    };

    try {
      // Send POST request to the backend
      const response = await axios.post(`${Backend_url}/signup`, formData);
      console.log('Response:', response.data); 

      
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPhone', phone);

      // Redirect to the /verifyotp page
      navigate('/verifyotp');
    } catch (error) {
      console.error('Error during signup:', error);
      
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Validate input: allow only numeric values
    if (/^\d*$/.test(value)) {
      setPhone(value);
      setPhoneError(false);
    } else {
      setPhoneError(true); 
    }
  };

  const handleEmployeeSizeChange = (e) => {
    const value = e.target.value;

    // Validate input: allow only numeric values
    if (/^\d*$/.test(value)) {
      setEmployeeSize(value);
      setEmployeeSizeError(false); 
    } else {
      setEmployeeSizeError(true); 
    }
  };

  return (
    <Grid2 container spacing={5} style={{ height: '100vh' }}>
      {/* Left Side: Text Section */}
      <Grid2 item xs={12} md={4} container alignItems="center" justifyContent="center">
        <Box sx={{ maxWidth: '400px', textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography variant="body1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </Typography>
        </Box>
      </Grid2>

      {/* Right Side: Sign Up Form */}
      <Grid2 item xs={12} marginLeft={20} md={10} container alignItems="center" justifyContent="flex-end" sx={{ paddingLeft: '16px' }}>
        <Card
          sx={{
            width: '500px',
            p: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <CardContent>
            <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="body2" textAlign="center" mb={2}>
              Lorem Ipsum is simply dummy text
            </Typography>

            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Name"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: '8px' }}>
                      <User />
                    </InputAdornment>
                  ),
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
                type="tel" // Change type to "tel"
                value={phone}
                onChange={handlePhoneChange} // Use the new handler
                error={phoneError} // Set error state
                helperText={phoneError ? 'Please enter a valid number.' : ''} // Display error message
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: '8px' }}>
                      <Phone />
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: '#f0f0f0',
                    border: phoneError ? '1px solid red' : '1px solid #ccc', // Change border color on error
                    borderRadius: '4px',
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Company Name"
                margin="normal"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: '8px' }}>
                      <User />
                    </InputAdornment>
                  ),
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: '8px' }}>
                      <Mail />
                    </InputAdornment>
                  ),
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
                value={employeeSize}
                onChange={handleEmployeeSizeChange} // Use the new handler
                error={employeeSizeError} // Set error state
                helperText={employeeSizeError ? 'Please enter a Number.' : ''} // Display error message
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: '8px' }}>
                      <Users />
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: '#f0f0f0',
                    border: employeeSizeError ? '1px solid red' : '1px solid #ccc', // Change border color on error
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

              {/* Loader and Button */}
              <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" fullWidth variant="contained" color="primary" sx={{ borderRadius: 2, fontSize: 18 }}>
                    Proceed
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default Signup;
