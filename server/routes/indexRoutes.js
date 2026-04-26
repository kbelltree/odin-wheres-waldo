const express = require('express');
const index = express.Router();
const indexController = require('../controllers/indexController');

index.get('/', (req, res) => {
  res.json({ message: `Where's the Kids API` });
});

index.get('/leaderboard', indexController.getTopTenGameSessions);

module.exports = index;
