function isWithinRange({ x, y }, { minX, minY, maxX, maxY }) {
  return x >= minX && y >= minY && x <= maxX && y <= maxY;
}

function calculateDurationMs(startedAt, finishedAt) {
  return finishedAt.getTime() - startedAt.getTime();
}

module.exports = {
  isWithinRange,
  calculateDurationMs,
};
