import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { LocationName } from "../locations/LocationFactory";
import { Scene } from "./Scene";

export class CellarScene implements Scene {
  getStartLocation(): LocationName {
    return "cfe-cellar";
  }

  getInitialObjects(): Map<LocationName, GameObject[]> {
    return new Map();
  }

  tick(world: GameWorld): void {
  }
}
