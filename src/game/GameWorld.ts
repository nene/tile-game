import { LocationFactory, LocationName } from "./locations/LocationFactory";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Player } from "./Player";

export class GameWorld {
  private locations: Map<LocationName, Location>;
  private activeLocation: Location;

  constructor(locations: LocationFactory[], private player: Player) {
    this.locations = new Map(locations.map((loc) => [loc.getName(), new Location(loc)]));
    this.activeLocation = this.getLocation(locations[0].getName());
    this.activeLocation.add(player);
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
    this.activeLocation.paint(screen);
  }

  teleport(object: GameObject, location: Location) {
    this.activeLocation.remove(object);
    this.activeLocation = location;
    this.activeLocation.add(object);
    this.activeLocation.activate();
  }
}
