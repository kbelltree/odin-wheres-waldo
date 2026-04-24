const indexService = require('../services/indexService');

async function getTopTenGameSessions(req, res, next) {
  try {
    const gameSessions = await indexService.listTopTenGameSessions();

    return res.status(200).json(gameSessions);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTopTenGameSessions,
};
