import {
  updateStartModal,
  displayModal,
  hideModal,
  displayErrorMessage,
} from './ui/modalUI';
import { startStopWatch, stopStopwatch } from './stopwatch';
import { getNormalizedCoords, adjustPopupCoords } from './utility/coordinates';
import {
  displayPopup,
  markFoundCharacter,
  markFoundCharacterIcons,
  markClickPosition,
  displayMissMessage,
  displayMissMsgOnMobileLayout,
} from './ui/gameImageUI';
import {
  setImageLoaded,
  getClickedCoords,
  setClickedCoords,
} from './game/gameState';
import { processCharacterChoice } from './game/gameController';
import { submitRecordForm, handleFormSkip } from './ui/recordFormUI';

const isMobileLayout = window.matchMedia('(max-width: 599px)').matches;

const mainImageFrame = document.querySelector('.main-img-container');

// Add eventlistener to parent div delegate click action
mainImageFrame.addEventListener('click', (e) => {
  setClickedCoords(getNormalizedCoords(e));

  const clickedCoords = getClickedCoords();

  const mobileChooser = document.querySelector('.mobile-chooser');

  if (isMobileLayout) {
    markClickPosition(clickedCoords);
    mobileChooser.scrollIntoView(true);
    mainImageFrame.removeChild(document.querySelector('.target-mark'));

    return;
  }

  const popupCoords = adjustPopupCoords(clickedCoords);

  displayPopup(popupCoords);
});

function handleChooserClick(e) {
  const button = e.target.closest('button');

  if (!button) return;

  const characterName = button.dataset.character;

  const clickedCoords = getClickedCoords();

  const { isHit, characterCoords, isGameOver } = processCharacterChoice(
    characterName,
    clickedCoords
  );

  if (!characterCoords) return;

  if (isHit) {
    markFoundCharacter(characterCoords);
    markFoundCharacterIcons();

    if (isGameOver) {
      stopStopwatch();

      setTimeout(() => {
        displayModal('#complete-modal');
      }, 1000);
    }
  } else {
    if (isMobileLayout) displayMissMsgOnMobileLayout();

    displayMissMessage(clickedCoords);
  }
}

// Large screen version
const popupChooser = document.getElementById('desktop-popup');

// Add eventListener to popup div and delegate to button
popupChooser.addEventListener('click', (e) => {
  e.stopPropagation();
  handleChooserClick(e);
  popupChooser.hidden = true;
});

// Mobile version
const mobileChooser = document.getElementById('static-chooser');

mobileChooser.addEventListener('click', (e) => {
  handleChooserClick(e);
});

// Start module
function handleImageLoadComplete() {
  setImageLoaded(true);

  updateStartModal();

  const startBtn = document.getElementById('start-btn');

  startBtn.addEventListener('click', () => {
    hideModal('#start-modal');
    startStopWatch();
  });
}

const image = document.querySelector('.main-img');

// Image loading status
if (image.complete && image.naturalWidth !== 0) {
  handleImageLoadComplete();
} else {
  // wait until image is loaded
  image.addEventListener('load', handleImageLoadComplete);
  image.addEventListener('error', displayErrorMessage);
}

// Game complete module
const recordForm = document.getElementById('record-form');
const recordSkipBtn = document.getElementById('submit-skip');

recordForm.addEventListener('submit', submitRecordForm);
recordSkipBtn.addEventListener('click', handleFormSkip);
