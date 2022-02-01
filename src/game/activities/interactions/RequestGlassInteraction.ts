import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkLevel, isBeerGlass } from "../../items/BeerGlass";
import { GameItem } from "../../items/GameItem";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class RequestGlassInteraction implements Interaction {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getType() {
    return InteractionType.glass;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!item || !(isBeerGlass(item))) {
      this.dialog.show(ui, "Reb! too mulle üks tühi šoppen.");
      return;
    }
    if (item.getLevel() !== DrinkLevel.empty) {
      this.dialog.show(ui, "Ma palusin tühja šoppenit.");
      return;
    }

    this.dialog.show(ui, "Aitäh!", {
      onClose: () => {
        ui.getAttributes().setSelectedItem(undefined);
        this.character.setField("glass", item);
        this.finished = true;
      },
    });
  }

  nextActivity() {
    return undefined;
  }
}
