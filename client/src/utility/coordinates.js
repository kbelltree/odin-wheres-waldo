// container w: 1100px h: 799px | aspect ratio 1100 / 799 = 1.3767209
// image w: 2200px h: 1598px | aspect ratio 2200 / 1598 = 1.3767209

// Get normalized x, y coords on the image
export function getNormalizedCoords(e) {
  const rect = e.currentTarget.getBoundingClientRect();

  const imgX = e.clientX - rect.left;
  const imgY = e.clientY - rect.top;

  const normalizedX = imgX / rect.width;
  const normalizedY = imgY / rect.height;

  return { x: normalizedX, y: normalizedY };
}

// Adjust the x, y coords to place the popup within the frame
export function adjustPopupCoords({ x, y }) {
  const normalizedPopupWH = { w: 127 / 1100, h: 123 / 799 };
  const rightEdge = x + normalizedPopupWH.w;
  const bottomEdge = y + normalizedPopupWH.h;

  if (rightEdge <= 1 && bottomEdge <= 1) {
    return { x, y };
  } else if (rightEdge > 1) {
    if (bottomEdge > 1) {
      return { x: x - (rightEdge - 1), y: y - (bottomEdge - 1) };
    }
    if (bottomEdge <= 1) {
      return { x: x - (rightEdge - 1), y };
    }
  } else {
    return { x, y: y - (bottomEdge - 1) };
  }
}

// Get dataset.character and find the matching character data
export function getCoordsByCharacter(characterName, data) {
  return data.find((d) => d.character === characterName);
}

// Check if clicked coords are within the targetCoords range
export function checkIfTargetRange({ x, y }, { minX, minY, maxX, maxY }) {
  return x >= minX && y >= minY && x <= maxX && y <= maxY;
}
