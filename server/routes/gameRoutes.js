const express = require('express');
const { prisma } = require('../lib/prisma');
const game = express.Router();
const gameController = require('../controllers/gameController');
const {
  calculateDurationMs,
  isWithinRange,
  addFoundTarget,
  isGameOver,
} = require('../utilities/gameLogic');

game.post('/start', gameController.createGameSession);

game.post('/:sessionId/end', gameController.finishGameSession);

game.post('/:sessionId/guess', gameController.processTargetChoice);

game.patch('/:sessionId/player-name', gameController.addGameSessionPlayerName);

module.exports = game;
