export type Coord = [number, number];

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

export function coordConstrain([x, y]: Coord, [minX, minY]: Coord, [maxX, maxY]: Coord): Coord {
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
