import express from 'express';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 




export const signup = async (req, res) => {
  const { name, phone, companyName, email, employeeSize, password } = req.body;


  if (!name || !phone || !companyName || !email || !employeeSize || !password) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      name,
      phone,
      companyName,
      email,
      employeeSize,
      password: hashedPassword,
    });

   
    await newUser.save();

    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    
    res.status(201).json({ message: 'User registered successfully!', token });
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
  

