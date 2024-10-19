import express from 'express';
import nodemailer from 'nodemailer';


// Function to send emails
const sendInvite = async (candidates, jobTitle, jobDescription, experienceLevel, endDate) => {
  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'willy15@ethereal.email',
        pass: 'YweUEWnR6FfTrFr9fk'
    }
});

  // Send an email to each candidate
  for (const candidate of candidates) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: candidate, // Sending email to the candidate
      subject: `Interview Invitation for ${jobTitle}`,
      html: `
        <h3>You have been invited to interview for the following position:</h3>
        <p><b>Job Title:</b> ${jobTitle}</p>
        <p><b>Job Description:</b> ${jobDescription}</p>
        <p><b>Experience Level Required:</b> ${experienceLevel}</p>
        ${endDate ? `<p><b>Interview must be completed by:</b> ${new Date(endDate).toLocaleDateString()}</p>` : ''}
        <p>We look forward to seeing your application and wish you the best of luck!</p>
      `,
    };

    // Send the email
    try {
    const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${candidate}`, nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error(`Failed to send email to ${candidate}: `, error);
    }
  }
};

// Endpoint to handle the interview creation and sending emails
export const inviteCandidate = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

  if (!jobTitle || !jobDescription || !experienceLevel || !candidates || candidates.length === 0) {
    return res.status(400).json({ message: 'All fields are required, and at least one candidate must be added.' });
  }

  try {
    // Send emails to candidates
    await sendInvite(candidates, jobTitle, jobDescription, experienceLevel, endDate);

    res.status(200).json({ message: 'Emails sent successfully to candidates.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails.' });
  }
};


