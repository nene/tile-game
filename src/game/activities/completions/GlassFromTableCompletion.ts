import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { isEmptyBeerGlass } from "../../items/BeerGlass";
import { Completion } from "./Completion";

export class GlassFromTableCompletion implements Completion {
  private complete = false;

  constructor(private character: AcademicCharacter) {
  }

  tryComplete(): boolean {
    const table = this.character.getField("table");
    if (!table) {
      throw new Error("Can't perform GlassFromTable completion when not sitting at table.");
    }

    const beerGlass = table.getInventory().takeFirstOfKind(isEmptyBeerGlass);
    if (beerGlass) {
      this.character.setField("glass", beerGlass);
      this.complete = true;
      return true;
    }
    return false;
  }

  isComplete() {
    return this.complete;
  }

  nextActivity() {
    return undefined;
  }
}
