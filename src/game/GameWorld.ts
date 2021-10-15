import { Coord, coordAdd, coordMul, isCoordInRect, Rect, screenToTileCoord, tileToScreenCoord } from "./Coord";
import { GameLocation } from "./locations/GameLocation";
import { GameObject } from "./GameObject";
import { ObjectIndexer } from "./ObjectIndexer";
import { PathFinder } from "./PathFinder";

export class GameWorld {
  private gameObjects: GameObject[] = [];
  private indexer: ObjectIndexer;
  private pathFinder: PathFinder;

  constructor(private location: GameLocation) {
    this.indexer = new ObjectIndexer(location.getGridSize());
    this.gameObjects.push(...this.location.getObjects());
    this.sortObjects();
    this.pathFinder = new PathFinder(this.indexer.isTileEmpty.bind(this.indexer));
  }

  size(): Coord {
    return coordMul(this.location.getGridSize(), [16, 16]);
  }

  add(...objects: GameObject[]) {
    this.gameObjects.push(...objects);
  }

  remove(object: GameObject) {
    this.gameObjects = this.gameObjects.filter((obj) => obj !== object);
  }

  allObjects(): GameObject[] {
    return this.gameObjects;
  }

  sortObjects() {
    this.gameObjects.sort((a, b) => {
      return a.zIndex() - b.zIndex();
    });
    this.indexer.updateObjects(this.gameObjects);
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

  getObjectsInRect(rect: Rect): GameObject[] {
    return this.indexer.getObjectsInRect(rect);
  }

  findPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
    return this.pathFinder.findPath(
      screenToTileCoord(coord1),
      screenToTileCoord(coord2)
    )?.map((coord) => coordAdd(tileToScreenCoord(coord), [8, 8]));
  }
}
