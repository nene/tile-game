import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";

export interface Scene {
  getStartLocation(): LocationName;
  tick(world: GameWorld): void;
}
