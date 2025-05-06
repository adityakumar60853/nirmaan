const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const schemeRoutes = require('./routes/schemeRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('Current directory:', __dirname);
console.log('Env file path:', path.join(__dirname, '.env'));
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? '***' : undefined,
  JWT_SECRET: process.env.JWT_SECRET ? '***' : undefined,
  NODE_ENV: process.env.NODE_ENV
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nirmaan', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Test MongoDB connection route
app.get('/api/test-db', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const status = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({ 
      message: 'MongoDB connection test', 
      status: status[dbStatus],
      connected: dbStatus === 1
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error testing MongoDB connection', 
      error: error.message 
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 