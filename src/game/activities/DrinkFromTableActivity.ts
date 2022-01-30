import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { isBeerBottle } from "../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { DrinkActivity } from "./DrinkActivity";

export class DrinkFromTableActivity implements Activity {
  private beerGlass?: BeerGlass;

  constructor(private character: AcademicCharacter) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    const table = figure.getTable();
    if (!table) {
      throw new Error("Can't perform DrinkFromTable activity when not sitting at table.");
    }

    const beerBottle = table.getInventory().takeFirstOfKind(isBeerBottle);
    if (beerBottle) {
      beerBottle.open();
      beerBottle.empty();
      this.beerGlass = new BeerGlass(beerBottle.getDrink(), DrinkLevel.full);
    }

    return {};
  }

  isFinished() {
    return Boolean(this.beerGlass);
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return this.beerGlass ? new DrinkActivity(this.beerGlass, this.character) : undefined;
  }
}
