import { Coord, coordSub } from "./Coord";
import { GameObject } from "./GameObject";

interface WorldConfig {
  width: number;
  height: number;
}

export class GameWorld {
  private gameObjects: GameObject[] = [];

  constructor(private cfg: WorldConfig) {
  }

  size(): Coord {
    return [this.cfg.width, this.cfg.height];
  }

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
      const diff = coordSub(obj.getCoord(), coord);
      return diff[0] > 0 && diff[0] <= 32 && diff[1] > -8 && diff[1] < 8;
    });
  }
}
