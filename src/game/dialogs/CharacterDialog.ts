import { Character } from "../npc/Character";
import { UiApi } from "../UiController";
import { Dialog } from "./Dialog";
import { TextContent } from "./TextContent";

interface CharacterDialogConfig {
  onClose?: () => void;
}

export class CharacterDialog {
  constructor(private character: Character) { }

  show(ui: UiApi, text: string, cfg: CharacterDialogConfig = {}) {
    ui.showModal(new Dialog({
      ui,
      character: this.character,
      createContent: (rect) => new TextContent({ text, rect, animated: true }),
      onClose: () => {
        ui.hideModal();
        cfg.onClose && cfg.onClose();
      },
    }));
  }
}
