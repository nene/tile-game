import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkLevel, isBeerGlass } from "../../items/BeerGlass";
import { showPlainTextDialog } from "../../dialogs/showPlainTextDialog";
import { GameItem } from "../../items/GameItem";

export class RequestGlassInteraction implements Interaction {
  private finished = false;

  constructor(private character: AcademicCharacter) {
  }

  getType() {
    return InteractionType.glass;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!item || !(isBeerGlass(item))) {
      this.showDialog(ui, "Reb! too mulle üks tühi šoppen.");
      return;
    }
    if (item.getLevel() !== DrinkLevel.empty) {
      this.showDialog(ui, "Ma palusin tühja šoppenit.");
      return;
    }

    this.showDialog(ui, "Aitäh!", () => {
      ui.getAttributes().setSelectedItem(undefined);
      this.character.setField("glass", item);
      this.finished = true;
    });
  }

  private showDialog(ui: UiController, text: string, onClose?: () => void) {
    showPlainTextDialog({ ui, character: this.character, text, onClose });
  }

  nextActivity() {
    return undefined;
  }
}
