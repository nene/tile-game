export type Coord = [number, number];

export function coordAdd(a: Coord, b: Coord): Coord {
  return [a[0] + b[0], a[1] + b[1]];
};

export function coordSubtract(a: Coord, b: Coord): Coord {
  return [a[0] - b[0], a[1] - b[1]];
}
