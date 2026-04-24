function isWithinRange({ x, y }, { minX, minY, maxX, maxY }) {
  return x >= minX && y >= minY && x <= maxX && y <= maxY;
}

function isGameOver(foundTargetSet, TargetCount) {
  return foundTargetSet.size === TargetCount;
}

function calculateDurationMs(startedAt, finishedAt) {
  return finishedAt.getTime() - startedAt.getTime();
}

module.exports = {
  isWithinRange,
  isGameOver,
  calculateDurationMs,
};
