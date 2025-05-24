const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const sectorRoutes = require('./routes/sectorRoutes');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration with allowed origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://pmce-frontend.vercel.app/',
    'https://pmce-frontend.vercel.app'
    
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS with options
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('PMCE API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/sectors', sectorRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only listen on a port when not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
}

// Export the Express API for Vercel
module.exports = app;