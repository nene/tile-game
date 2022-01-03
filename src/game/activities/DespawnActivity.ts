import { Location } from "../locations/Location";
import { AkademicCharacter } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class DespawnActivity implements Activity {
  private removed = false;

  constructor(private character: AkademicCharacter) {
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
