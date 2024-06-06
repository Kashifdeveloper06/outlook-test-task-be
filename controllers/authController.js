const express = require('express');
const router = express.Router();
const oauthConfig = require('../config/oauth');
const outlookService = require('../services/outlookService');

const login = (req, res) => {
    const oauthUrl = outlookService.generateOAuthUrl(oauthConfig);
    console.log('Redirecting to OAuth URL:', oauthUrl); // Log for debugging
    res.redirect(oauthUrl);
};

const callback = async (req, res) => {
    const code = req.query.code;
    console.log(code);

    if (!code) {
        console.error('Authorization code is missing'); // Log for debugging
        return res.status(400).send('Authorization code is missing');
    }

    try {
        const { accessToken, refreshToken } = await outlookService.exchangeCodeForToken(code, oauthConfig);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        res.status(500).send('Error during OAuth callback');
    }
};

module.exports = { login, callback };
