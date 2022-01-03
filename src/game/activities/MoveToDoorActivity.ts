import { Coord } from "../Coord";
import { findDoor } from "../furniture/Door";
import { Location } from "../locations/Location";
import { LocationName } from "../locations/LocationFactory";
import { AkademicCharacter } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToDoorActivity implements Activity {
  private targetCoord?: Coord;

  constructor(private doorTarget: LocationName, private character: AkademicCharacter) {
  }

  public tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    this.targetCoord = findDoor(location, this.doorTarget).getTeleportCoord();
    return {};
  }

  public isFinished() {
    return Boolean(this.targetCoord);
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    if (this.targetCoord) {
      return new MoveActivity(this.targetCoord, this.character);
    }
  }
}
