// Email synchronization controller
const express = require('express');
const router = express.Router();
const outlookService = require('../services/outlookService');
const elasticsearchService = require('../services/elasticsearchService');

// Sync email data from Outlook to local database

const sync = async (req, res) => {
    try {
        // Fetch email data from Outlook
        const emailData = await outlookService.fetchEmailData(req.user.accessToken);
        // Index email data in Elasticsearch
        await elasticsearchService.indexEmailData(req.user.id, emailData);
        res.send('Email synchronization complete');
    } catch (error) {
        console.error('Error during email synchronization:', error);
        res.status(500).send('Error during email synchronization');
    }
};


module.exports = { sync };
