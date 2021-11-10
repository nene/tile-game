import { LocationFactory, LocationName } from "./locations/LocationFactory";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Coord, Rect, rectDistance, rectTranslate } from "./Coord";
import { UiController } from "./UiController";

export class GameWorld {
  private locations: Map<LocationName, Location>;
  private activeLocation: Location;
  private player: Player;

  constructor(locations: LocationFactory[]) {
    this.locations = new Map(locations.map((loc) => [loc.getName(), new Location(loc)]));
    this.activeLocation = this.getLocation(locations[0].getName());
    this.player = new Player([286, 129]);
    this.activeLocation.add(this.player);
  }

  getActiveLocation(): Location {
    return this.activeLocation;
  }

  getPlayer(): Player {
    return this.player;
  }

  getLocation(name: LocationName): Location {
    return this.locations.get(name) as Location;
  }

  tick() {
    this.locations.forEach((location) => {
      location.tick(this);
    });
  }

  paint(screen: PixelScreen) {
    screen.centerTo(this.player.getCoord(), this.activeLocation);
    this.activeLocation.paint(screen);
  }

  teleport(object: GameObject, location: Location) {
    this.activeLocation.remove(object);
    this.activeLocation = location;
    this.activeLocation.add(object);
    this.activeLocation.activate();
  }

  isInteractable(ui: UiController, worldCoord: Coord): boolean {
    const obj = this.activeLocation.getObjectVisibleOnCoord(worldCoord);
    return Boolean(obj && isObjectsCloseby(this.player, obj) && obj.isInteractable(ui) && this.player.isFree());
  }

  interact(ui: UiController, worldCoord: Coord) {
    const obj = this.activeLocation.getObjectVisibleOnCoord(worldCoord);
    if (obj && isObjectsCloseby(this.player, obj) && this.player.isFree()) {
      obj.interact(ui);
    }
  }
}

function isObjectsCloseby(obj1: GameObject, obj2: GameObject) {
  return rectDistance(objectBounds(obj1), objectBounds(obj2)) < 16;
}

function objectBounds(obj: GameObject): Rect {
  return rectTranslate(obj.boundingBox(), obj.getCoord());
}
