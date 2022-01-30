import { Activity } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { BeerBottle, isBeerBottle } from "../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { DrinkActivity } from "./DrinkActivity";
import { GameWorld } from "../GameWorld";

export interface Completion {
  tryComplete(figure: CharacterFigure, location: Location, world: GameWorld): boolean;
  isComplete(): boolean;
  nextActivity(): Activity | undefined;
}

export class DrinkFromTableCompletion implements Completion {
  private beerBottle?: BeerBottle;

  constructor(private character: AcademicCharacter) {
  }

  tryComplete(figure: CharacterFigure): boolean {
    const table = figure.getTable();
    if (!table) {
      throw new Error("Can't perform DrinkFromTable activity when not sitting at table.");
    }

    const beerBottle = table.getInventory().takeFirstOfKind(isBeerBottle);
    if (beerBottle) {
      beerBottle.open();
      beerBottle.empty();
      this.beerBottle = beerBottle;
      return true;
    }
    return false;
  }

  isComplete() {
    return Boolean(this.beerBottle);
  }

  nextActivity() {
    if (this.beerBottle) {
      return new DrinkActivity(
        new BeerGlass(this.beerBottle.getDrink(), DrinkLevel.full),
        this.character
      );
    }
  }
}
