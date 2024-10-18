import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';

const experienceLevels = ['1-2', '2-3', '3-4', '4-5', '5-6', '6+'];

const CreateInterview = () => {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddCandidate = () => {
    if (candidateEmail) {
      setCandidates([...candidates, candidateEmail]);
      setCandidateEmail('');
    }
  };

  const handleSend = () => {
    
    console.log({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    });
    handleClose(); 
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" onClick={handleOpen}>
        Create Interview
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Create Interview
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            select
            fullWidth
            label="Experience Level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            margin="normal"
          >
            {experienceLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <TextField
              label="Add Candidate Email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              margin="normal"
            />
            <Button onClick={handleAddCandidate} variant="contained" sx={{ ml: 2 }}>
              Add
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            {candidates.map((email, index) => (
              <Chip key={index} label={email} onDelete={() => setCandidates(candidates.filter((c) => c !== email))} sx={{ margin: '2px' }} />
            ))}
          </Box>
          {/* <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateInterview;
