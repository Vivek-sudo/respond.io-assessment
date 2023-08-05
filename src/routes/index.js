const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const noteRoutes = require('./notes');

router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

module.exports = router;
