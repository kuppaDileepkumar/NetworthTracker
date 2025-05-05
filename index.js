const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



// Load environment variables
dotenv.config();

const authRoutes = require('./authRoutes');
const customerRoutes = require('./customerRoutes');
const loanRoutes = require('./loanRoutes');
const summaryRoutes = require('./summaryRoutes')
const repaymentRoutes = require('./repaymentRoutes')
const overdueRoutes = require('./overdueRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Default route
app.get('/', (req, res) => {
  res.send('Loan Manager API running ✅');
});

// ✅ Mock user for development/testing
app.use((req, res, next) => {
  req.user = { id: '660f5db07b6f0a6cbd834b71' } // replace with a real user ID from your DB
  next()
})


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/repayments', repaymentRoutes)
app.use('/api/summary', summaryRoutes)
app.use('/api', overdueRoutes);



// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGO_URI is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
