import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class EmptyBottlesInteraction implements Interaction {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getType() {
    return InteractionType.emptyBottle;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController) {
    this.dialog.show(ui, "Laibad laual!");
  }

  nextActivity() {
    return undefined;
  }
}
