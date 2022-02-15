import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";

export interface Scene {
  getStartLocation(): LocationName;
  getInitialObjects(): Map<LocationName, GameObject[]>;
  tick(world: GameWorld): void;
}
