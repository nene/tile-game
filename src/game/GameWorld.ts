import { Coord, Rect } from "./Coord";
import { LocationFactory } from "./locations/LocationFactory";
import { GameObject } from "./GameObject";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";

export class GameWorld {
  private locations: Location[];
  private activeLocation: Location;

  constructor(locations: LocationFactory[]) {
    this.locations = locations.map((loc) => new Location(loc));
    this.activeLocation = this.locations[0];
  }

  getActiveLocation(): Location {
    return this.activeLocation;
  }

  getSize(): Coord {
    return this.activeLocation.getSize();
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
