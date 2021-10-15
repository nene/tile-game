import { Coord, Rect } from "./Coord";
import { GameLocation } from "./locations/GameLocation";
import { GameObject } from "./GameObject";
import { LocationManager } from "./locations/LocationManager";
import { PixelScreen } from "./PixelScreen";

export class GameWorld {
  private locations: LocationManager[];
  private activeLocation: LocationManager;

  constructor(locations: GameLocation[]) {
    this.locations = locations.map((loc) => new LocationManager(loc));
    this.activeLocation = this.locations[0];
  }

  getActiveLocation(): LocationManager {
    return this.activeLocation;
  }

  size(): Coord {
    return this.activeLocation.size();
  }

  add(...objects: GameObject[]) {
    this.activeLocation.add(...objects);
  }

  remove(object: GameObject) {
    this.activeLocation.remove(object);
  }

  allObjects(): GameObject[] {
    return this.activeLocation.allObjects();
  }

  tick() {
    this.locations.forEach((location) => {
      location.tick(this);
    });
  }

  paint(screen: PixelScreen) {
    this.activeLocation.paint(screen);
  }

  getObjectVisibleOnCoord(screenCoord: Coord): GameObject | undefined {
    return this.activeLocation.getObjectVisibleOnCoord(screenCoord);
  }

  getObjectsInRect(rect: Rect): GameObject[] {
    return this.activeLocation.getObjectsInRect(rect);
  }

  findPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
    return this.activeLocation.findPath(coord1, coord2);
  }
}
