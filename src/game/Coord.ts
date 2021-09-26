export type Coord = [number, number];
export type Rect = { coord: Coord, size: Coord };

export function coordAdd(a: Coord, b: Coord): Coord {
  return [a[0] + b[0], a[1] + b[1]];
};

export function coordSub(a: Coord, b: Coord): Coord {
  return [a[0] - b[0], a[1] - b[1]];
}

export function coordMul(a: Coord, b: Coord): Coord {
  return [a[0] * b[0], a[1] * b[1]];
}

export function coordDiv(a: Coord, b: Coord): Coord {
  return [a[0] / b[0], a[1] / b[1]];
}

export function coordEq(a: Coord, b: Coord): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

export function coordConstrain([x, y]: Coord, { coord: [minX, minY], size }: Rect): Coord {
  const [maxX, maxY] = coordAdd([minX, minY], size);

  if (x < minX) {
    x = minX;
  }
  if (x > maxX) {
    x = maxX;
  }
  if (y < minY) {
    y = minY;
  }
  if (y > maxY) {
    y = maxY;
  }
  return [x, y];
}

// Takes any coord of any numbers and converts it to a coord that can only contain numbers -1, 0, 1
// coordUnit([-5, 8]) --> [-1, 1]
// coordUnit([0, 0.3]) -> [0, 1]
export function coordUnit(coord: Coord): Coord {
  return coord.map((x) => x > 0 ? 1 : (x < 0 ? -1 : 0)) as Coord;
}

export function coordDistance(coord1: Coord, coord2: Coord): number {
  const [a, b] = coordSub(coord1, coord2).map(Math.abs);
  return Math.sqrt(a * a + b * b);
}

export function isCoordInRect([x, y]: Coord, { coord: [x1, y1], size }: Rect): boolean {
  const [x2, y2] = coordAdd([x1, y1], coordSub(size, [1, 1]));
  return x >= x1 && y >= y1 && x <= x2 && y <= y2;
}

export function rectOverlaps({ coord: a1, size: aSize }: Rect, { coord: b1, size: bSize }: Rect) {
  const a2 = coordAdd(a1, aSize);
  const b2 = coordAdd(b1, bSize);

  const xOverlaps = a1[0] <= b2[0] && a2[0] >= b1[0];
  const yOverlaps = a1[1] <= b2[1] && a2[1] >= b1[1];
  return xOverlaps && yOverlaps;
}

const TILE_SIZE: Coord = [16, 16];

export function tileToScreenCoord(tileCoord: Coord): Coord {
  return coordMul(tileCoord, TILE_SIZE);
}

export function screenToTileCoord(screenCoord: Coord): Coord {
  return coordDiv(screenCoord, TILE_SIZE).map(Math.floor) as Coord;
}
