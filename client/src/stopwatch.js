let startTime;
let stopwatchIntervalId;

function updateStopwatch() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  document.getElementById('stopwatch').textContent = displayTime;
}

export function startStopWatch() {
  if (!stopwatchIntervalId) {
    startTime = new Date().getTime();
    stopwatchIntervalId = setInterval(updateStopwatch, 1000);
  }
}

export function stopStopwatch() {
  clearInterval(stopwatchIntervalId);

  stopwatchIntervalId = null;
}

export function resetStopwatch() {
  document.getElementById('stopwatch').textContent = '--:--';
}
