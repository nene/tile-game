import { findDoor } from "../furniture/Door";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { LocationName } from "../locations/LocationFactory";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class EnterDoorActivity implements Activity {
  private entered = false;

  constructor(private doorTarget: LocationName, private character: Character) {
  }

  tick(figure: CharacterFigure, oldLocation: Location, world: GameWorld): ActivityUpdates {
    const door = findDoor(oldLocation, this.doorTarget);
    const newLocation = world.getLocation(door.getToLocation());
    oldLocation.remove(figure);
    newLocation.add(figure);
    this.entered = true;
    return { coord: findDoor(newLocation, oldLocation.getName()).getTeleportCoord() };
  }

  isFinished() {
    return this.entered;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}
