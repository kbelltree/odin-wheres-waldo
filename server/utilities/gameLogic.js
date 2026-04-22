export function isWithinRange({ x, y }, { minX, minY, maxX, maxY }) {
  return x >= minX && y >= minY && x <= maxX && y <= maxY;
}

export function addFoundTarget(targetName, foundTargetSet) {
  if (typeof targetName !== 'string' || !targetName) return false;
  if (foundTargetSet.has(targetName)) return false;

  foundTargetSet.add(targetName);
  return true;
}

export function isGameOver(foundTargetSet, TargetData) {
  return foundTargetSet.size === TargetData.length;
}

export function calculateDurationMs(startedAt, finishedAt) {
  return finishedAt.getTime() - startedAt.getTime();
}
