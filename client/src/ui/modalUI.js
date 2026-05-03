export function updateStartModal() {
  const startBtn = document.getElementById('start-btn');
  const message = document.querySelector('.modal-message');

  startBtn.disabled = false;
  message.textContent = 'Click Start';
  startBtn.focus();
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
