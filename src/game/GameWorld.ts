import { LocationFactory } from "./locations/LocationFactory";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Player } from "./Player";

export class GameWorld {
  private locations: Location[];
  private activeLocation: Location;

  constructor(locations: LocationFactory[], private player: Player) {
    this.locations = locations.map((loc) => new Location(loc));
    this.activeLocation = this.locations[0];
    this.activeLocation.add(player);
  }

  getActiveLocation(): Location {
    return this.activeLocation;
  }

  getPlayer(): Player {
    return this.player;
  }

  allLocations(): Location[] {
    return this.locations;
  }

  tick() {
    this.locations.forEach((location) => {
      location.tick(this);
    });
  }

  paint(screen: PixelScreen) {
    this.activeLocation.paint(screen);
  }

  teleport(object: GameObject, location: Location) {
    this.activeLocation.remove(object);
    this.activeLocation = location;
    this.activeLocation.add(object);
    this.activeLocation.activate();
  }
}
