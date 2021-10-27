import { Coord, coordAdd } from "../Coord";
import { Door } from "../furniture/Door";
import { Location } from "../locations/Location";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToDoorActivity implements Activity {
  private targetCoord?: Coord;

  constructor(private character: Character) {
  }

  public tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    const door = location.allObjects().find((o) => o instanceof Door) as Door;
    this.targetCoord = coordAdd(door.getCoord(), [8, 8]);
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
