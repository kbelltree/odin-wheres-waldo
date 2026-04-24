const { prisma } = require('../lib/prisma');

async function listTopTenGameSessions() {
  return await prisma.gameSession.findMany({
    orderBy: {
      durationMS: 'asc',
    },
    take: 10,
  });
}

module.exports = {
  listTopTenGameSessions,
};
