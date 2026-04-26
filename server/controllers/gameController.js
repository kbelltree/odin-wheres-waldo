const gameService = require('../services/gameService');
const {
  calculateDurationMs,
  isWithinRange,
  addFoundTarget,
  isGameOver,
} = require('../utilities/gameLogic');

async function createGameSession(req, res, next) {
  try {
    const newSession = await gameService.createGameSession();

    return res.status(201).json(newSession);
  } catch (err) {
    next(err);
  }
}

async function finishGameSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    const completedSession = await gameService.finishGameSession(sessionId);

    return res.status(completedSession.status).json(completedSession.body);
  } catch (err) {
    next(err);
  }
}

async function processTargetChoice(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { name, x, y } = req.body;

    const result = await gameService.processTargetChoice({
      sessionId,
      name,
      x,
      y,
    });

    return res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
}

async function addGameSessionPlayerName(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { playerName } = req.body;

    const updatedSession = await gameService.addGameSessionPlayerName(
      sessionId,
      playerName
    );

    return res.status(200).json(updatedSession);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGameSession,
  finishGameSession,
  processTargetChoice,
  addGameSessionPlayerName,
};
