import { showPlainTextDialog } from "../dialogs/showPlainTextDialog";
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
      showPlainTextDialog({
        ui,
        character: this.character,
        text: "Milleks mulle see. Ma olen majaraamatus kenasti kirjas.\nToo endale šoppen vett, et oma tähelepanu turgutada.",
      });
    } else {
      showPlainTextDialog({
        ui,
        character: this.character,
        text: "Paistab, et olen unustanud end majaraamatusse kirjutada. Tänud tähelepanu juhtimast. Siin sulle kuue õlle raha.",
      });
      item.addEntry(this.character);
      ui.getAttributes().wallet.add(getDrink("alexander").price * 6);
    }
    return true;
  }
}
