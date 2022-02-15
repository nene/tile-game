import { Activity, ActivityUpdates } from "./Activity";
import { UiController } from "../UiController";
import { CharacterDialog } from "../dialogs/CharacterDialog";
import { Character } from "../npc/Character";

export class TalkActivity implements Activity {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(private text: string, character: Character) {
    this.dialog = new CharacterDialog(character);
  }

  tick(): ActivityUpdates {
    return {};
  }

  isFinished() {
    return this.finished;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    this.dialog.show(ui, this.text, {
      onClose: () => {
        this.finished = true;
      },
    });
  }

  nextActivity() {
    return undefined;
  }
}
