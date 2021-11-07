import { Door, isDoor } from "../furniture/Door";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class EnterDoorActivity implements Activity {
  private entered = false;

  constructor(private character: Character) {
  }

  tick(figure: CharacterFigure, oldLocation: Location, world: GameWorld): ActivityUpdates {
    const door = this.findDoor(oldLocation);
    const newLocation = world.getLocation(door.getTarget().location);
    oldLocation.remove(figure);
    newLocation.add(figure);
    this.entered = true;
    return { coord: this.findDoor(newLocation).getCoord() };
  }

  private findDoor(location: Location): Door {
    return location.allObjects().find(isDoor) as Door;
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
