import { Coord, coordAdd, isCoordInRect, Rect, screenToTileCoord, tileToScreenCoord } from "../Coord";
import { LocationFactory } from "./LocationFactory";
import { GameObject } from "../GameObject";
import { ObjectIndexer } from "../ObjectIndexer";
import { PathFinder } from "../PathFinder";
import { PixelScreen } from "../PixelScreen";
import { GameWorld } from "../GameWorld";
import { Background } from "../Background";

export class LocationManager {
  private background: Background;
  private objects: GameObject[];
  private indexer: ObjectIndexer;
  private pathFinder: PathFinder;

  constructor(private location: LocationFactory) {
    this.indexer = new ObjectIndexer(screenToTileCoord(location.getSize()));
    this.background = new Background(location.getBackground());
    this.objects = this.location.getObjects();
    this.sortObjects();
    this.pathFinder = new PathFinder(this.indexer.isTileEmpty.bind(this.indexer));
  }

  size(): Coord {
    return this.location.getSize();
  }

  add(...objects: GameObject[]) {
    this.objects.push(...objects);
  }

  remove(object: GameObject) {
    this.objects = this.objects.filter((obj) => obj !== object);
  }

  allObjects(): GameObject[] {
    return this.objects;
  }

  tick(world: GameWorld) {
    this.allObjects().forEach((obj) => obj.tick(world));
    this.sortObjects();
  }

  paint(screen: PixelScreen) {
    this.background.paint(screen);
    this.allObjects().forEach((obj) => obj.paint(screen));
  }

  private sortObjects() {
    this.objects.sort((a, b) => {
      return a.zIndex() - b.zIndex();
    });
    this.indexer.updateObjects(this.objects);
  }

  /**
   * Looks up objects based on their hitBox,
   * returns the first visible object (others might be behind it)
   */
  getObjectVisibleOnCoord(screenCoord: Coord): GameObject | undefined {
    // Loop through objects from front to back
    return [...this.objects].reverse().find((obj) => {
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
