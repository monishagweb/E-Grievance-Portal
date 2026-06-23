// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🧩 MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/egrievance_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 🧩 Import Routes (make sure you have routes files inside /routes folder)
const grievanceRoutes = require('./routes/grievanceRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/grievances', grievanceRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('E-Grievance Portal Backend Running Successfully 🚀');
});

// Server listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

