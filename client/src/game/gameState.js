let gameInitialState = {
  isImageLoaded: false,
  isBackendReady: false,
  isStartingGame: false,
};

let clickedCoords = null;

export function setImageLoaded(bool) {
  gameInitialState.isImageLoaded = bool;
}

export function setBackendReady(bool) {
  gameInitialState.isBackendReady = bool;
}

// Prevent from multiple 'Start' clicks, 'Start' will be disabled after a click
export function setStartingGame(bool) {
  gameInitialState.isStartingGame = bool;
}

export function getGameInitialState() {
  return { ...gameInitialState };
}

export function isReadyToStart() {
  return (
    gameInitialState.isImageLoaded &&
    gameInitialState.isBackendReady &&
    !gameInitialState.isStartingGame
  );
}

export function setClickedCoords({ x, y }) {
  clickedCoords = { x, y };
}

export function getClickedCoords() {
  return { ...clickedCoords };
}

export function setGameSessionId(sessionId) {
  sessionStorage.setItem('sessionId', sessionId);
}

export function getGameSessionId() {
  return sessionStorage.getItem('sessionId');
}

export function removeGameSessionId() {
  sessionStorage.removeItem('sessionId');
}

export function hasFoundTarget(foundTargetsSet, name) {
  return foundTargetsSet.has(name);
}
