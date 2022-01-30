import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { CharacterFigure } from "../../npc/CharacterFigure";
import { isFullBeerBottle } from "../../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../../items/BeerGlass";
import { DrinkActivity } from "../DrinkActivity";
import { Completion } from "./Completion";

export class DrinkFromTableCompletion implements Completion {
  private beerGlass?: BeerGlass;

  constructor(private character: AcademicCharacter) {
  }

  tryComplete(figure: CharacterFigure): boolean {
    const table = figure.getTable();
    if (!table) {
      throw new Error("Can't perform DrinkFromTable completion when not sitting at table.");
    }
    const beerGlass = figure.getGlass();
    if (!beerGlass) {
      throw new Error("Can't perform DrinkFromTable completion when no BeerGlass already at hand.");
    }

    const beerBottle = table.getInventory().takeFirstOfKind(isFullBeerBottle);
    if (beerBottle) {
      beerBottle.open();
      beerGlass.fill(beerBottle.getDrink(), DrinkLevel.full);
      this.beerGlass = beerGlass;
      beerBottle.empty();
      table.getInventory().add(beerBottle);
      return true;
    }
    return false;
  }

  isComplete() {
    return Boolean(this.beerGlass);
  }

  nextActivity() {
    if (this.beerGlass) {
      return new DrinkActivity(
        this.beerGlass,
        this.character
      );
    }
  }
}
