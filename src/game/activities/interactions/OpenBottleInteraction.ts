import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { GameItem } from "../../items/GameItem";
import { CallFuxActivity } from "../CallFuxActivity";
import { PourDrinkInteraction } from "./PourDrinkInteraction";

export class OpenBottleInteraction implements Interaction {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  getType() {
    return InteractionType.opener;
  }

  tryComplete(): boolean {
    const beerBottle = this.character.getField("bottle");
    if (!beerBottle) {
      throw new Error("Can't perform OpenBettleInteraction when no bottle already at hand.");
    }

    if (beerBottle.isOpen()) {
      this.finished = true;
      return true
    }
    if (this.character.hasSkill("opening")) {
      beerBottle.open();
      this.finished = true;
      return true
    }
    return false;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
  }

  nextActivity() {
    if (this.finished) {
      return new CallFuxActivity(this.character, new PourDrinkInteraction(this.character));
    }
  }
}
