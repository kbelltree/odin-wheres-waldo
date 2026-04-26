const express = require('express');
const { prisma } = require('../lib/prisma');
const game = express.Router();

const gameController = require('../controllers/gameController');
const gameValidator = require('../middlewares/gameValidator');

game.post('/start', gameController.createGameSession);

game.post(
  '/:sessionId/end',
  gameValidator.validateUuidInParam('sessionId'),
  gameController.finishGameSession
);

game.post(
  '/:sessionId/guess',
  gameValidator.validateUuidInParam('sessionId'),
  gameValidator.validateTargetChoice,
  gameController.processTargetChoice
);

game.patch(
  '/:sessionId/player-name',
  gameValidator.validateUuidInParam('sessionId'),
  gameValidator.validatePlayerName,
  gameController.addGameSessionPlayerName
);

module.exports = game;
