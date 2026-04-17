const targetCoords = [
  {
    character: 'horse',
    minX: 0.36272727272727273,
    minY: 0.867334167709637,
    maxX: 0.41818181818181815,
    maxY: 0.976846057571965,
  },
  {
    character: 'mask',
    minX: 0,
    minY: 0.3660951188986233,
    maxX: 0.03909090909090909,
    maxY: 0.42989987484355446,
  },
  {
    character: 'hat',
    minX: 0.7729090909090909,
    minY: 0.540811013767209,
    maxX: 0.8352727272727273,
    maxY: 0.6093767209011264,
  },
  {
    character: 'wall',
    minX: 0.9609090909090909,
    minY: 0.2265456821026283,
    maxX: 1,
    maxY: 0.2953566958698373,
  },
];

export function getTargetCoords() {
  return [...targetCoords];
}

export function getTargetCoordsLength() {
  return targetCoords.length;
}
