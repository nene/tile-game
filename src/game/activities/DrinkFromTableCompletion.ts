import { Activity } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { isFullBeerBottle } from "../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { DrinkActivity } from "./DrinkActivity";
import { GameWorld } from "../GameWorld";

export interface Completion {
  tryComplete(figure: CharacterFigure, location: Location, world: GameWorld): boolean;
  isComplete(): boolean;
  nextActivity(): Activity | undefined;
}

export class DrinkFromTableCompletion implements Completion {
  private beerGlass?: BeerGlass;

  constructor(private character: AcademicCharacter) {
  }

  tryComplete(figure: CharacterFigure): boolean {
    const table = figure.getTable();
    if (!table) {
      throw new Error("Can't perform DrinkFromTable activity when not sitting at table.");
    }

    const beerBottle = table.getInventory().takeFirstOfKind(isFullBeerBottle);
    if (beerBottle) {
      beerBottle.open();
      this.beerGlass = new BeerGlass(beerBottle.getDrink(), DrinkLevel.full);
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
