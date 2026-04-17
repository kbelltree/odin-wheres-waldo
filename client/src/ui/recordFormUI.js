import { hideModal } from './modalUI';
import { resetStopwatch } from '../stopwatch';

export function submitRecordForm(e) {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value;

  console.log('Name: ', name);

  setTimeout(() => {
    hideModal('#complete-modal');
    resetStopwatch();
    window.location.assign('/#leaderboard');
  }, 1000);
}

export function handleFormSkip() {
  window.location.assign('/');
}
