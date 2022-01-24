import { Coord } from "../Coord";

export type Facing = "up" | "down" | "left" | "right";

export function headingToFacing(heading: Coord): Facing {
  if (heading[0] > 0) {
    return 'right';
  }
  if (heading[0] < 0) {
    return 'left';
  }
  if (heading[1] > 0) {
    return 'down';
  }
  return 'up';
}
