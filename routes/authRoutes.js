const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/authorization', authController.login);
router.get('/callback', authController.callback);

module.exports = router;
