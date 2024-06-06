// Email synchronization routes
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/sync', emailController.sync);

module.exports = router;
