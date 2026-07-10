const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');

const app = express();
const PORT = process.env.PORT || 5001; // 5001 এ পরিবর্তন

// ===== MIDDLEWARE =====
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);

// ===== TEST ROUTE =====
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'PlantPal API is running! 🚀',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// ===== MONGODB CONNECTION =====
console.log('🔄 Connecting to MongoDB Atlas...');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas Successfully!');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Test API: http://localhost:${PORT}/api/test`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  });

// ===== ERROR HANDLING =====
// 404 handler - এটা নিচে রাখুন
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});