
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js'; 
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});


app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example route' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


