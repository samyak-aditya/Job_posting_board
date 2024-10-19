import React, { useState } from 'react';
import { House } from 'lucide-react';
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Chip,
  Typography,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { Backend_url } from '../assets/api';

const experienceLevels = ['1-2 Years', '2-3 Years', '3-4 Years', '4-5 Years', '5-6 Years', '6+ Years'];

const CreateInterview = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [emailError, setEmailError] = useState(''); // Email validation error state

  const token = localStorage.getItem('jwtToken');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

  const handleAddCandidate = () => {
    if (emailPattern.test(candidateEmail)) {
      setCandidates([...candidates, candidateEmail]);
      setCandidateEmail('');
      setEmailError(''); // Clear error message if valid
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleSend = async () => {
    setLoading(true); // Start loading when send is clicked
    const interviewData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    };

    try {
      const response = await axios.post(`${Backend_url}/create-invite`, interviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // On success: Clear fields, hide form, and show success message
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setCandidates([]);
      setEndDate(null);
      setShowForm(false);
      setSuccessMessage('Interview created successfully!'); // Show success message

    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading(false); // Stop loading when request is finished
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setSuccessMessage(''); // Clear success message when showing form
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        component="section"
        sx={{
          width: 75,
          height: '100vh',
          bgcolor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRight: '2px solid #ccc',
          padding: 2,
          marginTop: 5,
          display: 'flex',
          justifyContent: 'center',
          zIndex: '-1',
        }}
      >
        <House size={30} style={{ marginTop: '70px' }} />
      </Box>

      {/* Success message */}
      {successMessage && (
        <Box sx={{ marginLeft: 10, marginTop: 3 }}>
          <Typography color="success">{successMessage}</Typography>
        </Box>
      )}

      {/* Button to show form */}
      {!showForm && (
        <Box sx={{ marginLeft: 10, marginTop: 3 }}>
          <Button variant="contained" color="primary" onClick={handleShowForm}>
            Create Interview
          </Button>
        </Box>
      )}

      {/* Form or Verification Message */}
      {showForm ? (
        token ? (
          <Box sx={{ marginLeft: 10, marginTop: 3, width: '80%' }}>
            {/* Job Title Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ width: '250px', textAlign: 'right', pr: 2, fontWeight: 'bold', fontSize: '24px' }}>
                Job Title:
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                sx={{ fontSize: '18px' }}
              />
            </Box>

            {/* Job Description Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ width: '250px',height:"200px", textAlign: 'right', pr: 2, fontWeight: 'bold', fontSize: '24px' }}>
                Job Description:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{ fontSize: '18px' }}
              />
            </Box>

            {/* Experience Level Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ width: '250px', textAlign: 'right', pr: 2, fontWeight: 'bold', fontSize: '24px' }}>
                Experience Level:
              </Typography>
              <TextField
                select
                fullWidth
                placeholder="Select experience level"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                sx={{ fontSize: '18px' }}
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Candidate Email Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ width: '250px', textAlign: 'right', pr: 2, fontWeight: 'bold', fontSize: '24px' }}>
                Add Candidate:
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter candidate email"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                error={Boolean(emailError)} // Add error prop
                helperText={emailError} // Display error message if invalid
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handleAddCandidate} variant="contained" color="primary">
                        Add
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{ fontSize: '18px' }}
              />
            </Box>

            
            <Box sx={{ mb: 2 }}>
              {candidates.map((email, index) => (
                <Chip
                  key={index}
                  label={email}
                  onDelete={() => setCandidates(candidates.filter((c) => c !== email))}
                  sx={{ margin: '2px' }}
                />
              ))}
            </Box>

            {/* End Date Picker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ width: '250px', textAlign: 'right', pr: 2, fontWeight: 'bold', fontSize: '24px' }}>
                  End Date:
                </Typography>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ width:"200px", fontSize: '18px' }} />}
                />
              </Box>
            </LocalizationProvider>

            {/* Submit Button */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                onClick={handleSend}
                variant="contained"
                color="primary"
                disabled={loading} // Disable button when loading
                sx={{ width: "150px", height: "40px", padding: '12px 24px', fontSize: '18px' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ marginLeft: 10, marginTop: 3 }} color="error">
            You need to verify your phone number and email to continue.
          </Typography>
        )
      ) : null}
    </Box>
  );
};

export default CreateInterview;
