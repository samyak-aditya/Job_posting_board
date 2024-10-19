import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified, 
    },
    JWT_SECRET,
    { expiresIn: '1h' } 
  );
};


export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Please provide both email and OTP.' });
  }

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    if (user.otpExpires && user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Email OTP has expired.' });
    }

   
    if (otp !== user.emailOtp) {
      return res.status(400).json({ message: 'Invalid email OTP.' });
    }

    
    user.emailOtp = null;

    
    if (!user.mobileOtp) {
      user.isVerified = true;

    
      const token = generateToken(user);

      await user.save();
      return res.status(200).json({ message: 'Email OTP verified successfully.', token });
    }

    await user.save();
    res.status(200).json({ message: 'Email OTP verified successfully.' });
  } catch (error) {
    console.error('Email OTP verification error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


export const verifyMobileOtp = async (req, res) => {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ message: 'Please provide both phone number and OTP.' });
    }
  
    try {

      const user = await User.findOne({ phone });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if mobile OTP has already been verified or cleared
      if (!user.mobileOtp) {
        return res.status(400).json({ message: 'Mobile OTP has already been verified.' });
      }
  
      // Check if the mobile OTP is expired
      if (user.mobileOtpExpires && user.mobileOtpExpires < Date.now()) {
        return res.status(400).json({ message: 'Mobile OTP has expired.' });
      }
  
      // Compare the provided OTP with the one in the database
      if (otp !== user.mobileOtp) {
        return res.status(400).json({ message: 'Invalid mobile OTP.' });
      }
  
      
      user.mobileOtp = null;
  
     
      if (!user.emailOtp) {
        user.isVerified = true;
  
        
        const token = generateToken(user);
  
        await user.save();
        return res.status(200).json({ message: 'Mobile OTP verified successfully. User is fully verified.', token });
      }
  
      await user.save();
      res.status(200).json({ message: 'Mobile OTP verified successfully.' });
    } catch (error) {
      console.error('Mobile OTP verification error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
