import { Coord, coordMul } from "./Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";

export class GameWorld {
  private gameObjects: GameObject[] = [];

  constructor(private location: GameLocation) {
  }

  size(): Coord {
    return coordMul(this.location.gridSize(), [16, 16]);
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
}
