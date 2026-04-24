const {
  calculateDurationMs,
  isWithinRange,
  isGameOver,
} = require('../utilities/gameLogic');

describe('isWithinRange function', () => {
  const mockCoords = {
    minX: 0.362,
    minY: 0.867,
    maxX: 0.418,
    maxY: 0.976,
  };

  test('returns true if the passed coordinate is within boundary', () => {
    expect(isWithinRange({ x: 0.395, y: 0.92 }, mockCoords)).toBe(true);
  });

  test('returns false if the passed coordinate is out of boundary', () => {
    expect(isWithinRange({ x: 0.35, y: 0.978 }, mockCoords)).toBe(false);
  });
});

describe('isGameOver function', () => {
  const mockSetIncomplete = new Set([1, 2, 3]);
  const mockSetComplete = new Set([1, 2, 3, 4]);

  test('returns false if the passed foundTarget size does not match total target count', () => {
    expect(isGameOver(mockSetIncomplete, 4)).toBe(false);
  });

  test('returns true if the passed foundTarget size matches total target count', () => {
    expect(isGameOver(mockSetComplete, 4)).toBe(true);
  });
});

describe('calculateDurationMs', () => {
  test('return duration in milliseconds', () => {
    const startedAt = new Date('2026-04-18T10:00:00.000Z');
    const finishedAt = new Date('2026-04-18T10:00:05.250Z');

    expect(calculateDurationMs(startedAt, finishedAt)).toBe(5250);
  });

  test('return duration in milliseconds', () => {
    const startedAt = new Date('2026-04-18T10:00:00.000Z');
    const finishedAt = new Date('2026-04-18T10:00:05.250Z');

    expect(calculateDurationMs(startedAt, finishedAt)).toBe(5250);
  });
});
