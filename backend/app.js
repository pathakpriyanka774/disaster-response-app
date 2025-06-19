const express = require('express');
const cors = require('cors');
const app = express();

// Load routes
const disasterRoutes = require('./routes/disasterRoutes');
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/disasters', disasterRoutes);

app.get('/', (req, res) => {
    res.send('🌍 Disaster Response API is live!');
});

const geocodeRoutes = require('./routes/geocodeRoutes');
app.use('/api/geocode', geocodeRoutes);

const resourceRoutes = require('./routes/resourceRoutes');
app.use('/api/disasters', resourceRoutes); // ✅ This line is CRUCIAL

const socialMediaRoutes = require('./routes/socialMediaRoutes');
app.use('/api/disasters', socialMediaRoutes);

const imageVerifyRoutes = require('./routes/imageVerifyRoutes');
app.use('/api/disasters', imageVerifyRoutes); // e.g., /api/disasters/:id/verify-image




module.exports = app;