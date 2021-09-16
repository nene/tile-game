import { Coord, coordSubtract } from "./Coord";
import { GameObject } from "./GameObject";

export class GameWorld {
  private gameObjects: GameObject[] = [];

  add(...objects: GameObject[]) {
    this.gameObjects.push(...objects);
  }

  allObjects(): GameObject[] {
    return this.gameObjects;
  }

  sortObjects() {
    this.gameObjects.sort((a, b) => {
      return a.zIndex() - b.zIndex();
    });
  }

  getRightHandObject(coord: Coord): GameObject | undefined {
    return this.gameObjects.find((obj) => {
      const diff = coordSubtract(obj.getCoord(), coord);
      return diff[0] > 0 && diff[0] <= 32 && diff[1] > -8 && diff[1] < 8;
    });
  }
}
