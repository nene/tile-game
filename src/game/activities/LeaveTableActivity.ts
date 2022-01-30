import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class LeaveTableActivity implements Activity {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    figure.sitAtTable(undefined);
    this.finished = true;
    return {};
  }

  isFinished() {
    return this.finished;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity(): Activity | undefined {
    return undefined;
  }
}
