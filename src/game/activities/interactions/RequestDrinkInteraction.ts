import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { GameItem } from "../../items/GameItem";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { CallFuxActivity } from "../CallFuxActivity";
import { OpenBottleInteraction } from "./OpenBottleInteraction";
import { isFullBeerBottle } from "../../items/BeerBottle";

export class RequestDrinkInteraction implements Interaction {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getType() {
    return InteractionType.beer;
  }

  tryComplete(): boolean {
    const table = this.character.getField("table");
    if (!table) {
      throw new Error("Can't perform DrinkFromTable completion when not sitting at table.");
    }
    const beerGlass = this.character.getField("glass");
    if (!beerGlass) {
      throw new Error("Can't perform DrinkFromTable completion when no BeerGlass already at hand.");
    }

    const beerBottle = table.getInventory().takeFirstOfKind(isFullBeerBottle);
    if (beerBottle) {
      this.character.setField("bottle", beerBottle);
      this.finished = true;
      return true;
    }
    return false;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    // todo...
  }

  nextActivity() {
    if (this.finished) {
      return new CallFuxActivity(this.character, new OpenBottleInteraction(this.character));
    }
  }
}
