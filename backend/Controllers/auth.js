import express from 'express';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 
import nodemailer from 'nodemailer'







// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'willy15@ethereal.email',
        pass: 'YweUEWnR6FfTrFr9fk'
    }
});
  




const sendOTPSMS = async (phone, mobileOtp) => {
    console.log(`Mock SMS sent to ${phone}: Your mobile OTP is: ${mobileOtp}`);
  };
// Helper function to send OTP via email using Nodemailer
const sendOTPEmail = async (email, emailOtp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your Email OTP Code',
    text: `Your email OTP is: ${emailOtp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email OTP sent successfully.',nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending OTP via email:', error);
  }
};

// Signup endpoint
export const signup = async (req, res) => {
  const { name, phone, companyName, email, employeeSize, password } = req.body;


console.log('Signup', req.body);
console.log('data', name, phone, companyName, email, employeeSize )
  if (!name || !phone || !companyName || !email || !employeeSize) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);

    // Generate two different OTPs: one for email and one for mobile
    

    // Generate a 6-digit OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
      };
      
      // Usage example
      const emailOtp = generateOTP();
      console.log('Your email OTP is:', emailOtp);
      
      const mobileOtp = generateOTP();
      console.log('Your mobile OTP is:', mobileOtp);

    

    // Save the user with the email and mobile OTPs
    const newUser = new User({
      name,
      phone,
      companyName,
      email,
      employeeSize,
     
      emailOtp,  // Store email OTP
      mobileOtp, // Store mobile OTP
      isVerified: false,  // User is not verified until both OTPs are confirmed
    });

    await newUser.save();
console.log('User saved');
    // Send different OTPs to email and mobile
    await sendOTPEmail(email, emailOtp);
    await sendOTPSMS(phone, mobileOtp);

    res.status(201).json({ message: 'User registered! Different OTPs sent to mobile and email.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }
  
    try {
   
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
     
      res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

