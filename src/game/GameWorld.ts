import { Coord } from "./Coord";
import { GameObject } from "./GameObject";

export class GameWorld {
  constructor(private gameObjects: GameObject[]) {
  }

  getRightHandObject(coord: Coord): GameObject | undefined {
    return this.gameObjects.find((obj) => {
      const diff = coordSubtract(obj.getCoord(), coord);
      return diff[0] > 0 && diff[0] <= 32 && diff[1] > -8 && diff[1] < 8;
    });
  }
}

function coordSubtract(a: Coord, b: Coord): Coord {
  return [a[0] - b[0], a[1] - b[1]];
}
