import { Activity, ActivityUpdates } from "./Activity";
import { UiController } from "../UiController";
import { GameItem } from "../items/GameItem";
import { FeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { showPlainTextDialog } from "../dialogs/showPlainTextDialog";

export class SellAlcoholActivity implements Activity {
  constructor(private character: FeenoksLadyCharacter) {
  }

  tick(): ActivityUpdates {
    return {};
  }

  isFinished() {
    return false;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController, item?: GameItem) {
    showPlainTextDialog({
      ui,
      character: this.character,
      text: "Teretulemast Feenoksi alkoparadiisi!",
    });
  }

  nextActivity() {
    return undefined;
  }
}
