import { fetchData } from '../utility/api';

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
  const { ok, data } = await fetchData('http://localhost:3000/leaderboard');

  if (!ok || !Array.isArray(data)) return { ok, data: [] };

  if (!Array.isArray(data)) {
    return { ok, data: [] };
  }

  return { ok, data: data.map(normalizeLeaderboardItem) };
}
