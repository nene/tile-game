import { Coord, coordAdd, coordMul } from "./Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";

type TileMap = Record<string, GameObject[]>;

export class GameWorld {
  private gameObjects: GameObject[] = [];
  private tileMap: TileMap = {};

  constructor(private location: GameLocation) {
    this.gameObjects.push(...this.location.getStaticObjects());
    this.gameObjects.push(...this.location.getDynamicObjects());
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
    this.tileMap = this.sortToTiles(this.gameObjects);
  }

  private sortToTiles(objects: GameObject[]): TileMap {
    const grid = this.location.getGrid();
    const tileMap: TileMap = {};
    objects.forEach((obj) => {
      const tileCoord = grid.screenToTileCoord(obj.getCoord());
      for (let dx = 0; dx < obj.tileSize()[0]; dx++) {
        for (let dy = 0; dy < obj.tileSize()[1]; dy++) {
          const key = coordAdd(tileCoord, [dx, dy]).join(",");
          const array = tileMap[key] ?? [];
          array.push(obj);
          tileMap[key] = array;
        }
      }
    });

    return tileMap;
  }

  getObjectsInTile(screenCoord: Coord): GameObject[] {
    const grid = this.location.getGrid();
    const tileCoord = grid.screenToTileCoord(screenCoord);
    const key = tileCoord.join(",");
    return this.tileMap[key] || [];
  }
}
