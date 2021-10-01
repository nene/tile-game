import { Coord, screenToTileCoord } from "./Coord";
import { GameObject } from "./GameObject";
import { groupByTiles } from "./groupByTiles";

type TileMap = Record<string, GameObject[]>;

export class ObjectIndexer {
  private tileMap: TileMap = {};

  constructor(private gridSize: Coord) { }

  updateObjects(gameObjects: GameObject[]) {
    this.tileMap = groupByTiles(gameObjects);
  }

  getObjectsOnCoord(screenCoord: Coord): GameObject[] {
    return this.getObjectsInTile(screenToTileCoord(screenCoord));
  }

  private getObjectsInTile(tileCoord: Coord): GameObject[] {
    const key = tileCoord.join(",");
    return this.tileMap[key] || [];
  }

  isTileEmpty([x, y]: Coord): boolean {
    const [maxX, maxY] = this.gridSize;
    if (x < 0 || y < 0 || x >= maxX || y >= maxY) {
      return false;
    }
    return !this.getObjectsInTile([x, y]).some((obj) => obj.isSolid());
  }
}
