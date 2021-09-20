import { Coord, coordEq, coordMul } from "./Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";

export class GameWorld {
  private gameObjects: GameObject[] = [];

  constructor(private location: GameLocation) {
    this.gameObjects.push(...this.location.getStaticObjects());
  }

  size(): Coord {
    return coordMul(this.location.getGrid().size(), [16, 16]);
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

  getObjectsInTile(screenCoord: Coord): GameObject[] {
    const grid = this.location.getGrid();
    const tileCoord = grid.screenToTileCoord(screenCoord);
    return this.gameObjects.filter((obj) => coordEq(tileCoord, grid.screenToTileCoord(obj.getCoord())));
  }
}
