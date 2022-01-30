import { Table } from "../furniture/Table";
import { BeerGlass } from "../items/BeerGlass";
import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class LeaveTableActivity implements Activity {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    const tableInventory = this.character.getField<Table>("table")?.getInventory();
    const beerGlass = this.character.getField<BeerGlass>("glass");
    if (tableInventory && beerGlass && !tableInventory.isFull()) {
      tableInventory.add(beerGlass);
    }
    this.character.setField("glass", undefined);
    this.character.setField("table", undefined);
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
