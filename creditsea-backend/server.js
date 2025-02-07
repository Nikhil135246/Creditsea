require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);



	app.use(express.static(path.join(__dirname, "../creditsea-frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../creditsea-frontend", "build", "index.html"));
	});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));