import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkActivity } from "./../DrinkActivity";
import { GameItem } from "../../items/GameItem";
import { DrinkLevel } from "../../items/BeerGlass";

export class PourDrinkInteraction implements Interaction {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  getType() {
    return InteractionType.beer;
  }

  tryComplete(): boolean {
    const beerBottle = this.character.getField("bottle");
    if (!beerBottle) {
      throw new Error("Can't perform PourDrinkInteraction when no bottle already at hand.");
    }
    const beerGlass = this.character.getField("glass");
    if (!beerGlass) {
      throw new Error("Can't perform PourDrinkInteraction when no BeerGlass already at hand.");
    }
    const table = this.character.getField("table");
    if (!table) {
      throw new Error("Can't perform PourDrinkInteraction completion when not sitting at table.");
    }

    beerGlass.fill(beerBottle.getDrink(), DrinkLevel.full);
    beerBottle.empty();
    table.getInventory().add(beerBottle);
    this.character.satisfyDesire("beer");
    this.finished = true;
    return true;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
  }

  nextActivity() {
    if (this.finished) {
      return new DrinkActivity(this.character);
    }
  }
}
