import { displayErrorMessage, hideModal } from './modalUI';
import { resetStopwatch } from '../stopwatch';
import { submitPlayerName } from '../data/data';
import { getGameSessionId, removeGameSessionId } from '../game/gameState';
import { displayLeaderboard } from './leaderboardUI';

export async function submitRecordForm(e) {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value;

  const sessionId = getGameSessionId();

  const result = await submitPlayerName(sessionId, name);

  if (!result.ok) {
    displayErrorMessage('.form-message', result.errorMessage);
    return;
  }

  await displayLeaderboard();

  hideModal('#complete-modal');
  resetStopwatch();
  removeGameSessionId();

  window.location.assign('/#leaderboard');
}

export function handleFormSkip() {
  window.location.assign('/');
}
