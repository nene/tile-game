import { Coord } from "./types";

export const Vector = {
  add(a: Coord, b: Coord): Coord {
    return [a[0] + b[0], a[1] + b[1]];
  },
};
