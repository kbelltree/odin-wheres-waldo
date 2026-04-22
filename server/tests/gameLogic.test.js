import {
  isWithinRange,
  addFoundTarget,
  isGameOver,
  calculateDurationMs,
} from '../utilities/gameLogic';

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

describe('addFoundTarget function', () => {
  let mockSet;

  beforeEach(() => {
    mockSet = new Set(['one', 'two', 'three']);
  });

  test('returns size 3 if the passed name already exists, and returns false', () => {
    const result = addFoundTarget('two', mockSet);

    expect(mockSet.size).toBe(3);
    expect(result).toBe(false);
  });

  test('does not add undefined if the passed name is undefined, and returns false', () => {
    const result = addFoundTarget(undefined, mockSet);

    expect(mockSet.has(undefined)).toBe(false);
    expect(result).toBe(false);
  });

  test('does not add null if the passed name is null, and returns false', () => {
    const result = addFoundTarget(null, mockSet);

    expect(mockSet.has(null)).toBe(false);
    expect(result).toBe(false);
  });

  test('does not add it if the passed name is not a string, and returns false', () => {
    const result = addFoundTarget(100, mockSet);

    expect(mockSet.has(100)).toBe(false);
    expect(result).toBe(false);
  });

  test('returns size 4 if the passed name does not exist', () => {
    const result = addFoundTarget('four', mockSet);

    expect(mockSet.size).toBe(4);
    expect(result).toBe(true);
  });
});

describe('isGameOver function', () => {
  const mockData = [
    {
      id: 1,
      character: 'a',
    },
    {
      id: 2,
      character: 'b',
    },
    {
      id: 3,
      character: 'c',
    },
    {
      id: 4,
      character: 'd',
    },
  ];
  const mockSetIncomplete = new Set([1, 2, 3]);
  const mockSetComplete = new Set([1, 2, 3, 4]);

  test('returns false if the passed foundTarget size does not match with Target data length', () => {
    expect(isGameOver(mockSetIncomplete, mockData)).toBe(false);
  });

  test('returns true if the passed foundTarget size matches with Target data length', () => {
    expect(isGameOver(mockSetComplete, mockData)).toBe(true);
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
