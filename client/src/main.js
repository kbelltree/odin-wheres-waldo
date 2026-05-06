import { startStopWatch, stopStopwatch } from './stopwatch';
import { getNormalizedCoords, adjustPopupCoords } from './utility/coordinates';
import {
  displayPopup,
  markFoundCharacter,
  markFoundCharacterIcons,
  displayMissMessage,
  displayMissMsgOnMobileLayout,
} from './ui/gameImageUI';
import {
  updateStartModal,
  hideModal,
  displayModal,
  displayErrorMessage,
  updateEndModal,
} from './ui/modalUI';
import { submitRecordForm, handleFormSkip } from './ui/recordFormUI';
import { displayLeaderboard } from './ui/leaderboardUI';
import { getNewGameSessionId, isBackendUp } from './data/data';
import {
  setImageLoaded,
  getClickedCoords,
  setClickedCoords,
  setGameSessionId,
  removeGameSessionId,
  isReadyToStart,
  getGameInitialState,
  setBackendReady,
  setStartingGame,
} from './game/gameState';
import { getDuration, processCharacterChoice } from './game/gameController';

document.addEventListener('DOMContentLoaded', () => {
  const isMobileLayout = window.matchMedia('(max-width: 599px)').matches;

  const mainImageFrame = document.querySelector('.main-img-container');
  const popupChooser = document.getElementById('desktop-popup');
  const mobileChooser = document.getElementById('static-chooser');
  const image = document.querySelector('.main-img');
  const recordForm = document.getElementById('record-form');
  const recordSkipBtn = document.getElementById('submit-skip');

  // Add eventlistener to parent div delegate click action
  mainImageFrame.addEventListener('click', (e) => {
    setClickedCoords(getNormalizedCoords(e));

    const clickedCoords = getClickedCoords();

    const mobileChooser = document.querySelector('.mobile-chooser');

    if (isMobileLayout) {
      mobileChooser.scrollIntoView(true);
      mainImageFrame.removeChild(document.querySelector('.target-mark'));

      return;
    }

    const popupCoords = adjustPopupCoords(clickedCoords);

    displayPopup(popupCoords);
  });

  async function handleChooserClick(e) {
    const button = e.target.closest('button');

    if (!button) return;

    const targetName = button.dataset.character;

    const { isHit, isGameCompleted, foundTargetsSet, targetCoords, x, y } =
      await processCharacterChoice(targetName);

    if (isHit) {
      markFoundCharacter(targetCoords);
      markFoundCharacterIcons(foundTargetsSet);

      if (isGameCompleted) {
        stopStopwatch();

        const { time } = await getDuration();

        updateEndModal(time);

        setTimeout(() => {
          displayModal('#complete-modal');
        }, 1000);
      }
    } else {
      isMobileLayout
        ? displayMissMsgOnMobileLayout()
        : displayMissMessage({ x, y });
    }
  }

  // Add eventListener to popup div and delegate to button
  popupChooser.addEventListener('click', (e) => {
    e.stopPropagation();
    handleChooserClick(e);
    popupChooser.hidden = true;
  });

  mobileChooser.addEventListener('click', (e) => {
    handleChooserClick(e);
  });

  function syncStartModalWithState() {
    const isReady = isReadyToStart();

    if (isReady) {
      updateStartModal({
        messageText: 'Click Start',
        buttonText: 'Start',
        isDisabled: false,
        shouldFocus: true,
      });

      return;
    }

    const { isImageLoaded, isBackendReady, isStartingGame } =
      getGameInitialState();

    if (isStartingGame) {
      updateStartModal({
        messageText: 'Starting game...',
        buttonText: 'Starting...',
        isDisabled: true,
      });

      return;
    }

    if (!isImageLoaded) {
      updateStartModal({
        messageText: 'Getting ready...',
        buttonText: 'Getting ready...',
        isDisabled: true,
      });

      return;
    }

    if (!isBackendReady) {
      updateStartModal({
        messageText: 'Waking up the server. This may take a moment.',
        buttonText: 'Getting ready...',
        isDisabled: true,
      });

      return;
    }
  }

  async function checkBackendReady() {
    const isReady = await isBackendUp();

    setBackendReady(isReady);

    syncStartModalWithState();
  }

  async function handleGameSetupComplete() {
    setImageLoaded(true);
    syncStartModalWithState();

    // No 'await' needed due to non-critical task
    displayLeaderboard();

    removeGameSessionId();

    await checkBackendReady();
  }

  const startBtn = document.getElementById('start-btn');

  startBtn.addEventListener('click', async () => {
    if (!isReadyToStart()) return;

    setStartingGame(true);
    syncStartModalWithState();

    const { ok, sessionId, errorMessage } = await getNewGameSessionId();

    if (!ok) {
      setStartingGame(false);

      updateStartModal({
        messageText: errorMessage || 'Please try again.',
        buttonText: 'Retry',
        isDisabled: false,
        shouldFocus: true,
      });

      return;
    }

    setGameSessionId(sessionId);
    hideModal('#start-modal');
    startStopWatch();
  });

  syncStartModalWithState();

  // Image loading status
  if (image.complete && image.naturalWidth !== 0) {
    handleGameSetupComplete();
  } else {
    // wait until image is loaded
    image.addEventListener('load', handleGameSetupComplete);

    image.addEventListener('error', () =>
      displayErrorMessage('.modal-message')
    );
  }

  recordForm.addEventListener('submit', submitRecordForm);
  recordSkipBtn.addEventListener('click', handleFormSkip);
});
