import { fetchData } from '../utility/api';
import { API_BASE_URL } from '../config';

function formatTime(ms) {
  if (typeof ms !== 'number' || Number.isNaN(ms) || ms < 0) ms = 0;

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function normalizeLeaderboardItem(data) {
  return {
    name: data.playerName || 'Anonymous',
    time: formatTime(data.durationMS),
  };
}

export async function getLeaderboard() {
  const { ok, data } = await fetchData(`${API_BASE_URL}/leaderboard`);

  if (!ok || !Array.isArray(data)) return { ok, data: [] };

  if (!Array.isArray(data)) {
    return { ok, data: [] };
  }

  return { ok, data: data.map(normalizeLeaderboardItem) };
}

export async function getNewGameSessionId() {
  const { ok, data, errorMessage } = await fetchData(
    `${API_BASE_URL}/game/start`,
    { method: 'POST' }
  );

  if (!ok) return { ok, errorMessage };

  return { ok, sessionId: data.id };
}

export async function guessTarget(sessionId, name, x, y) {
  const { ok, data } = await fetchData(
    `${API_BASE_URL}/game/${sessionId}/guess`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        x,
        y,
      }),
    }
  );

  if (!ok)
    return {
      ok,
      isHit: false,
      isGameCompleted: false,
      foundTargetsSet: null,
      targetCoords: null,
    };

  const { isHit, isGameCompleted, foundTargets, targetCoords } = data;

  return {
    ok,
    isHit,
    isGameCompleted,
    foundTargetsSet: new Set(foundTargets),
    targetCoords,
  };
}

export async function endGame(sessionId) {
  const { ok, data, errorMessage } = await fetchData(
    `${API_BASE_URL}/game/${sessionId}/end`,
    {
      method: 'POST',
    }
  );

  if (!ok) return { ok, errorMessage };

  return { ok, id: data.id, time: formatTime(data.durationMS) };
}

export async function submitPlayerName(sessionId, name = 'Anonymous') {
  const { ok, data, errorMessage } = await fetchData(
    `${API_BASE_URL}/game/${sessionId}/player-name`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName: name,
      }),
    }
  );

  if (!ok) return { ok, errorMessage };

  return { ok, id: data.id };
}
