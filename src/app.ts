import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/users', userRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to use the web interface`);
});