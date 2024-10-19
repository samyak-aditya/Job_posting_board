import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authmiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes token is sent as "Bearer <token>"
console.log("token--->",token);
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
console.log("Verified token ",decoded);
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default authmiddleware;
