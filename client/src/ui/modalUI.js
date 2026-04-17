export function updateStartModal() {
  const startBtn = document.getElementById('start-btn');
  const message = document.querySelector('.modal-message');

  startBtn.disabled = false;
  message.textContent = 'Click Start';
}

export function displayModal(selector) {
  const modal = document.querySelector(selector);
  modal.hidden = false;
}

export function hideModal(selector) {
  const modal = document.querySelector(selector);
  modal.hidden = true;
}

export function displayErrorMessage() {
  const message = document.querySelector('.modal-message');
  message.textContent = 'Something went wrong.';
}
