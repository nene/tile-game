import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class DespawnActivity implements Activity {
  private removed = false;

  constructor(private character: AcademicCharacter) {
  }

  public tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    location.remove(figure);
    this.removed = true;
    return {};
  }

  public isFinished() {
    return this.removed;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}
