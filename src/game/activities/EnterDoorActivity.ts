import { Door, isDoor } from "../furniture/Door";
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
    const door = this.findDoor(oldLocation, this.doorTarget);
    const newLocation = world.getLocation(door.getToLocation());
    oldLocation.remove(figure);
    newLocation.add(figure);
    this.entered = true;
    return { coord: this.findDoor(newLocation, oldLocation.getName()).getCoord() };
  }

  private findDoor(location: Location, target: LocationName): Door {
    const door = location.allObjects().filter(isDoor).find((door) => door.getToLocation() === target);
    if (!door) {
      throw new Error("No suitable door found");
    }
    return door;
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
