import { noop } from "lodash";
import { Dialog } from "../dialogs/Dialog";
import { TextContent } from "../dialogs/TextContent";
import { GameWorld } from "../GameWorld";
import { Book } from "../items/Book";
import { getDrink } from "../items/Drink";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";

export interface PlainInteraction {
  interact: (ui: UiController, world: GameWorld) => boolean;
}

export class ReceiveBookInteraction implements PlainInteraction {
  constructor(private character: Character) { }

  interact(ui: UiController, world: GameWorld): boolean {
    const item = ui.getSelectedItem();
    if (!(item instanceof Book)) {
      return false;
    }

    if (item.getEntries().some((char) => char === this.character)) {
      this.showDialog(
        ui,
        "Milleks mulle see. Ma olen majaraamatus kenasti kirjas.\nToo endale šoppen vett, et oma tähelepanu turgutada.",
      );
    } else {
      this.showDialog(
        ui,
        "Paistab, et olen unustanud end majaraamatusse kirjutada. Tänud tähelepanu juhtimast. Siin sulle kuue õlle raha.",
      );
      item.addEntry(this.character);
      ui.getAttributes().wallet.add(getDrink("alexander").price * 6);
    }
    return true;
  }

  private showDialog(ui: UiController, text: string, onClose: () => void = noop) {
    ui.showModal(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => {
        ui.hideModal();
        onClose();
      },
    }));
  }
}
