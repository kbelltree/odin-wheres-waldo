let gameInitialState = {
  isImageLoaded: false,
  // isBackendReady: false
};

let clickedCoords = null;

const foundCharacters = new Set();

export function setImageLoaded(bool) {
  gameInitialState.isImageLoaded = bool;
}

export function setClickedCoords({ x, y }) {
  clickedCoords = { x, y };
}

export function getClickedCoords() {
  return { ...clickedCoords };
}

export function addNewFoundCharacter(characterName) {
  foundCharacters.add(characterName);
}

export function hasFoundCharacter(character) {
  return foundCharacters.has(character);
}

export function getFoundCharactersCount() {
  return foundCharacters.size;
}
