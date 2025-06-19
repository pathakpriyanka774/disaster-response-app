const express = require('express');
const router = express.Router();
const { geocode } = require('../controllers/geocodeController');

router.post('/', geocode);

module.exports = router;