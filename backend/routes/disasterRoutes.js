const express = require('express');
const router = express.Router();
const { createDisaster, getDisasters } = require('../controllers/disasterController');

router.post('/', createDisaster);
router.get('/', getDisasters);

module.exports = router;