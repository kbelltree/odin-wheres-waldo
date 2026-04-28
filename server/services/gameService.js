const { prisma } = require('../lib/prisma');
const {
  calculateDurationMs,
  isWithinRange,
  isGameOver,
} = require('../utilities/gameLogic');

async function createGameSession() {
  return await prisma.gameSession.create({
    data: {},
    select: { id: true, startedAt: true, foundTargets: true },
  });
}

async function findGameSessionStartedAt(id) {
  return await prisma.gameSession.findUnique({
    where: { id },
    select: { startedAt: true },
  });
}

async function updateFinishedSession(id, finishedAt, durationMS) {
  return await prisma.gameSession.update({
    where: { id },
    data: {
      finishedAt,
      durationMS,
    },
    select: {
      id: true,
      finishedAt: true,
      durationMS: true,
    },
  });
}

async function finishGameSession(id) {
  const session = await findGameSessionStartedAt(id);

  if (!session) {
    return {
      status: 404,
      body: { error: 'Session could not be found' },
    };
  }

  const finishedAt = new Date();

  const durationMS = calculateDurationMs(session.startedAt, finishedAt);

  const updatedSession = await updateFinishedSession(
    id,
    finishedAt,
    durationMS
  );

  return {
    status: 200,
    body: updatedSession,
  };
}

async function findTargetCoords(name) {
  return await prisma.target.findUnique({
    where: { name },
    select: { name: true, minX: true, minY: true, maxX: true, maxY: true },
  });
}

async function findGameSessionFoundTargets(id) {
  const session = await prisma.gameSession.findUnique({
    where: { id },
    select: {
      foundTargets: true,
    },
  });

  if (!session) return null;
  return session.foundTargets;
}

async function updateGameSessionFoundTargets(id, foundTargetsSet) {
  return await prisma.gameSession.update({
    where: { id },
    data: {
      // Convert foundTargetsSet back to arr
      foundTargets: [...foundTargetsSet],
    },
    select: {
      id: true,
      foundTargets: true,
    },
  });
}

async function countTargets() {
  return await prisma.target.count();
}

async function processTargetChoice({ sessionId, name, x, y }) {
  const foundTargets = await findGameSessionFoundTargets(sessionId);

  if (!foundTargets) {
    return {
      status: 404,
      body: { error: 'Game session not found' },
    };
  }

  // Convert foundTargets arr into Set (mutable);
  const foundTargetsSet = new Set(foundTargets);

  if (foundTargetsSet.has(name))
    return {
      status: 409,
      body: { error: `${name} is already found` },
    };

  const targetCoords = await findTargetCoords(name);

  if (!targetCoords) {
    return {
      status: 404,
      body: { error: 'Target not found' },
    };
  }

  const isHit = isWithinRange(
    { x, y },
    {
      minX: targetCoords.minX,
      minY: targetCoords.minY,
      maxX: targetCoords.maxX,
      maxY: targetCoords.maxY,
    }
  );

  if (!isHit) {
    return {
      status: 200,
      body: {
        isHit: false,
        isGameCompleted: false,
      },
    };
  }

  foundTargetsSet.add(targetCoords.name);

  await updateGameSessionFoundTargets(sessionId, foundTargetsSet);

  const targetCount = await countTargets();
  const isGameCompleted = isGameOver(foundTargetsSet, targetCount);

  return {
    status: 200,
    body: {
      isHit: true,
      isGameCompleted,
    },
  };
}

async function addGameSessionPlayerName(id, playerName) {
  return await prisma.gameSession.update({
    where: { id },
    data: {
      playerName: playerName || 'Anonymous',
    },
    select: {
      id: true,
      playerName: true,
    },
  });
}

module.exports = {
  createGameSession,
  finishGameSession,
  processTargetChoice,
  addGameSessionPlayerName,
};
