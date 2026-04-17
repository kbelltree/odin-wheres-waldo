import { getTargetCoords, getTargetCoordsLength } from '../data/data';
import {
  getCoordsByCharacter,
  checkIfTargetRange,
} from '../utility/coordinates';
import { addNewFoundCharacter, getFoundCharactersCount } from './gameState';

function evaluateCharacterChoice(
  characterName,
  clickedCoords,
  targetCoordsList
) {
  const characterCoords =
    getCoordsByCharacter(characterName, targetCoordsList) ?? null;

  const isHit = characterCoords
    ? checkIfTargetRange(clickedCoords, characterCoords)
    : false;

  return {
    isHit,
    characterName,
    characterCoords,
  };
}

function checkGameOver() {
  return getFoundCharactersCount() === getTargetCoordsLength();
}

export function processCharacterChoice(characterName, clickedCoords) {
  let result = evaluateCharacterChoice(
    characterName,
    clickedCoords,
    getTargetCoords()
  );

  if (result.isHit) {
    addNewFoundCharacter(characterName);
  }

  const isGameOver = checkGameOver();

  return {
    ...result,
    isGameOver,
  };
}
