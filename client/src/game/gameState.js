let gameInitialState = {
  isImageLoaded: false,
};

let clickedCoords = null;

export function setImageLoaded(bool) {
  gameInitialState.isImageLoaded = bool;
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
