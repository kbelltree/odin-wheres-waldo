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
