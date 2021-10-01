import { Coord, coordAdd, coordMul, isCoordInRect, screenToTileCoord, tileToScreenCoord } from "./Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";
import { groupByTiles } from "./groupByTiles";
import { PathFinder } from "./PathFinder";

type TileMap = Record<string, GameObject[]>;

export class GameWorld {
  private gameObjects: GameObject[] = [];
  private tileMap: TileMap = {};
  private pathFinder: PathFinder;

  constructor(private location: GameLocation) {
    this.gameObjects.push(...this.location.getStaticObjects());
    this.gameObjects.push(...this.location.getDynamicObjects());
    this.sortObjects();
    this.pathFinder = new PathFinder(this.isTileEmpty.bind(this));
  }

  size(): Coord {
    return coordMul(this.location.getGridSize(), [16, 16]);
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
    this.tileMap = groupByTiles(this.gameObjects);
  }

  /**
   * Looks up objects based on their hitBox,
   * returns the first visible object (others might be behind it)
   */
  getObjectVisibleOnCoord(screenCoord: Coord): GameObject | undefined {
    // Loop through objects from front to back
    return [...this.gameObjects].reverse().find((obj) => {
      const hitBox = obj.hitBox();
      const topLeft = coordAdd(obj.getCoord(), hitBox.coord);
      return isCoordInRect(screenCoord, { coord: topLeft, size: hitBox.size });
    });
  }

  getObjectsOnCoord(screenCoord: Coord): GameObject[] {
    return this.getObjectsInTile(screenToTileCoord(screenCoord));
  }

  private getObjectsInTile(tileCoord: Coord): GameObject[] {
    const key = tileCoord.join(",");
    return this.tileMap[key] || [];
  }

  private isTileEmpty([x, y]: Coord): boolean {
    const [maxX, maxY] = this.location.getGridSize();
    if (x < 0 || y < 0 || x >= maxX || y >= maxY) {
      return false;
    }
    return !this.getObjectsInTile([x, y]).some((obj) => obj.isSolid());
  }

  findPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
    return this.pathFinder.findPath(
      screenToTileCoord(coord1),
      screenToTileCoord(coord2)
    )?.map((coord) => coordAdd(tileToScreenCoord(coord), [8, 8]));
  }
}
