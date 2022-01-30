import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class LeaveTableActivity implements Activity {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    const tableInventory = figure.getTable()?.getInventory();
    const beerGlass = figure.getGlass();
    if (tableInventory && beerGlass && !tableInventory.isFull()) {
      tableInventory.add(beerGlass);
    }
    figure.setGlass(undefined);
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
