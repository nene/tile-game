import { Coord } from "../Coord";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";

export interface WorldPosition {
  location: LocationName;
  coord: Coord
}

export interface Scene {
  getStartPosition(): WorldPosition;
  tick(world: GameWorld): void;
}
