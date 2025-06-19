const express = require('express');
const router = express.Router();
const { getSocialMediaPosts } = require('../controllers/socialMediaController');

router.get('/:id/social-media', getSocialMediaPosts);

module.exports = router;