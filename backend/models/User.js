import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  employeeSize: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  emailOtp: { 
    type: String 
}, 
  mobileOtp: { 
    type: String 
}, 
  isVerified: { 
    type: Boolean, default: false 
}
});


const User = mongoose.model('User', userSchema);

export default User;
