const express = require('express');
const index = express.Router();
const indexController = require('../controllers/indexController');

index.get('/', indexController.getTopTenGameSessions);

module.exports = index;
