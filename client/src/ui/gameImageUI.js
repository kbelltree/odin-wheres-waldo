import { hasFoundTarget } from '../game/gameState';

const mainImageFrame = document.querySelector('.main-img-container');

// Display popup near the clicked coords on the game image
export function displayPopup({ x, y }) {
  const popupChooser = document.querySelector('#desktop-popup');

  popupChooser.style.top = `${y * 100}%`;
  popupChooser.style.left = `${x * 100}%`;

  popupChooser.hidden = false;
}

export function markFoundCharacter({ minX, minY, maxX, maxY }) {
  const marker = document.createElement('div');

  // Create a rectangular mark
  marker.style.left = `${minX * 100}%`;
  marker.style.top = `${minY * 100}%`;
  marker.style.width = `${(maxX - minX) * 100}%`;
  marker.style.height = `${(maxY - minY) * 100}%`;

  marker.classList.add('img-marker');

  mainImageFrame.appendChild(marker);
}

export function markFoundCharacterIcons(foundTargetsSet) {
  const icons = document.querySelectorAll('.character-icons');

  icons.forEach((icon) => {
    const character = icon.dataset.character;

    if (hasFoundTarget(foundTargetsSet, character)) {
      icon.classList.add('found-icon');
    }
  });
}

export function displayMissMessage({ x, y }) {
  const text = document.createElement('p');

  text.textContent = 'Miss!';
  text.classList.add('miss-message');

  text.style.left = `${x * 100}%`;
  text.style.top = `${y * 100}%`;

  mainImageFrame.appendChild(text);

  setTimeout(() => {
    if (mainImageFrame.contains(text)) mainImageFrame.removeChild(text);
  }, 1000);
}

export function displayHitMissMsgOnMobileLayout(message = '') {
  const msgContainer = document.querySelector('.hit-miss-message');

  msgContainer.textContent = message;

  setTimeout(() => {
    msgContainer.textContent = '';
  }, 1000);
}
