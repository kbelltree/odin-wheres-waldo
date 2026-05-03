import { getGameSessionId, getClickedCoords } from './gameState';
import { endGame, guessTarget } from '../data/data';

export async function processCharacterChoice(targetName) {
  const sessionId = getGameSessionId();

  const { x, y } = getClickedCoords();

  const result = await guessTarget(sessionId, targetName, x, y);

  return { ...result, x, y };
}

export async function getDuration() {
  const sessionId = getGameSessionId();

  const result = endGame(sessionId);

  return result;
}
