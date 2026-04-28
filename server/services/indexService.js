const { prisma } = require('../lib/prisma');

async function listTopTenGameSessions() {
  return await prisma.gameSession.findMany({
    where: {
      finishedAt: {
        not: null,
      },
      durationMS: {
        not: null,
      },
    },
    orderBy: {
      durationMS: 'asc',
    },
    take: 10,
    select: {
      finishedAt: true,
      playerName: true,
      durationMS: true,
    },
  });
}

module.exports = {
  listTopTenGameSessions,
};
