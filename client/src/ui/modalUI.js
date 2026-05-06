export function updateStartModal({
  messageText = 'Loading...',
  buttonText = 'Start',
  isDisabled = true,
  shouldFocus = false,
} = {}) {
  const startBtn = document.getElementById('start-btn');
  const message = document.querySelector('.modal-message');

  message.textContent = messageText;
  startBtn.textContent = buttonText;
  startBtn.disabled = isDisabled;

  if (shouldFocus && !isDisabled) startBtn.focus();
}

export function displayModal(selector) {
  const modal = document.querySelector(selector);

  modal.hidden = false;
}

export function hideModal(selector) {
  const modal = document.querySelector(selector);

  modal.hidden = true;
}

export function displayErrorMessage(
  selector,
  errorMessage = 'Something went wrong.'
) {
  const msgContainer = document.querySelector(selector);

  msgContainer.textContent = errorMessage;
}

export function updateEndModal(duration) {
  const timeContainer = document.getElementById('complete-time');

  timeContainer.textContent = duration;
}
