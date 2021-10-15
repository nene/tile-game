import { LocationFactory } from "./locations/LocationFactory";
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

  tick() {
    this.locations.forEach((location) => {
      location.tick(this);
    });
  }

  paint(screen: PixelScreen) {
    this.activeLocation.paint(screen);
  }
}
