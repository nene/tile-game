import { AkademicCharacter } from "../npc/Character";
import { UiController } from "../UiController";
import { Dialog } from "./Dialog";
import { TextContent } from "./TextContent";

interface PlainTextDialogConfig {
  ui: UiController;
  character: AkademicCharacter;
  text: string;
  onClose?: () => void;
}

export function showPlainTextDialog({ ui, character, text, onClose }: PlainTextDialogConfig) {
  ui.showModal(new Dialog({
    ui,
    character: character,
    createContent: (rect) => new TextContent(text, rect),
    onClose: () => {
      ui.hideModal();
      onClose && onClose();
    },
  }));
}
