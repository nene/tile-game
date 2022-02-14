import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Dialog } from "./Dialog";
import { TextContent } from "./TextContent";

interface CharacterDialogConfig {
  onClose?: () => void;
}

export class CharacterDialog {
  constructor(private character: Character) { }

  show(ui: UiController, text: string, cfg: CharacterDialogConfig = {}) {
    ui.showModal(new Dialog({
      ui,
      character: this.character,
      createContent: (rect) => new TextContent(text, rect, true),
      onClose: () => {
        ui.hideModal();
        cfg.onClose && cfg.onClose();
      },
    }));
  }
}
